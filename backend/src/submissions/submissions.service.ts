import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { UpdateSubmissionDto } from './dto/update-submission.dto';
import { PrismaService } from 'src/prisma.service';
import { HttpService } from '@nestjs/axios';
type AIResult = {
  modelVersion: string;
  overallBand: number;
  criteria?: { taskResponse?: number; cohenrence?: number; lexical?: number; grammar?: number };
  feedback: string;
  annotation?: any[];
  metrics?: { wordCount?: number }
  aiProvider?: string;
  tokenPrompt?: number;
  tokenOutput?: number;
  costUsd?: number;
}

@Injectable()
export class SubmissionsService {
  constructor(
    private prismaService: PrismaService,
    private readonly http: HttpService
  ) { }
  create(userId: number, createSubmissionDto: CreateSubmissionDto) {
    if (!createSubmissionDto.contentText || createSubmissionDto.contentText.trim().split(/\s+/).length < 50) {
      throw new BadRequestException('Essay must be at least 50 words')
    }
    const wordCount = createSubmissionDto.contentText.split(/\s+/).length

    return this.prismaService.submission.create({
      data: {
        user: { connect: { id: userId } },
        type: 'WRITING',
        contentText: createSubmissionDto.contentText,
        status: 'PENDING',
        promptId: createSubmissionDto.promptId ?? null,
        wordCount,
        payment: createSubmissionDto.paymentId ? { connect: { id: createSubmissionDto.paymentId } } : undefined
      }
    })
  }

  async gradeWithAi(submissionId: number, userId: number, promptText?: string) {
  const submission = await this.prismaService.submission.findUnique({ where: { id: submissionId } })
  if (!submission) throw new NotFoundException('submission not found')
  if (submission.userId !== userId) throw new BadRequestException('submission forbidden(not owner)')

  if (submission.status !== 'PENDING') {
    return { submissionId: submissionId, overallBand: submission.aiScore ?? null, modelVersion: submission.modelVersion ?? null, reused: true }
  }

  const user = await this.prismaService.user.findUnique({ where: { id: userId }, select: { freeUsedWriting: true } })
  const FREE = Number(process.env.FREE_WRITTING_QUOTA)
  if ((user?.freeUsedWriting ?? 0) >= FREE) {
    throw new BadRequestException('Free quota exceeds')
  }

  const AI_BASE = process.env.AI_BASE_URL || 'http://localhost:8000';
  const AI_TOKEN = process.env.AI_INTERNAL_TOKEN;
  if (!AI_TOKEN) throw new BadRequestException('server misconfigured: AI_INTERNAL_TOKEN missing')
  let ai: AIResult;
  try {
    const { data } = await this.http.axiosRef.post<AIResult>(
      `${AI_BASE}/grade/writing/full`,
      { submission_id: submission.id, prompt: promptText, text: submission.contentText ?? '' },
      { headers: { 'X-Internal-Token': AI_TOKEN, 'Content-Type': 'application/json' }, timeout: 25000 }
    );
    ai = data;
  } catch (err) {
    throw new BadRequestException('AI service error');
  }

  // (e) transaction: update submission + tạo/ghi feedback AI + tăng quota
  await this.prismaService.$transaction(async (tx) => {
    await tx.submission.update({
      where: { id: submission.id },
      data: {
        status: 'AI_GRADED',
        aiScore: ai.overallBand,
        wordCount: ai.metrics?.wordCount ?? submission.wordCount ?? null,
        gradedAt: new Date(),
        modelVersion: ai.modelVersion,
        aiProvider: ai.aiProvider ?? (process.env.GPT_MODEL ? `openai:${process.env.GPT_MODEL}` : null),
        aiCostUsd: ai.costUsd ?? null,
      },
    });

    // upsert AI feedback (mỗi submission chỉ 1 bản theo source=AI)
    const exist = await tx.feedback.findFirst({
      where: { submissionId: submission.id, source: 'AI' as any },
      select: { id: true },
    });

    const fbData = {
      source: 'AI' as any,
      content: ai.feedback,
      taskResponse: ai.criteria?.taskResponse ?? null,
      coherence: ai.criteria?.cohenrence ?? null,
      lexical: ai.criteria?.lexical ?? null,
      grammar: ai.criteria?.grammar ?? null,
      highlights: ai.annotation ?? [],
      modelVersion: ai.modelVersion,
      aiProvider: ai.aiProvider ?? undefined,
      tokensPrompt: ai.tokenPrompt ?? undefined,
      tokensOutput: ai.tokenOutput ?? undefined,
      costUsd: ai.costUsd ?? undefined
    };

    if (exist) {
      await tx.feedback.update({ where: { id: exist.id }, data: fbData });
    } else {
      await tx.feedback.create({ data: { submissionId: submission.id, ...fbData } });
    }

    // tăng quota free sau khi chấm thành công
    await tx.user.update({
      where: { id: userId },
      data: { freeUsedWriting: { increment: 1 } },
    });
  });

  return { submissionId: submission.id, overallBand: ai.overallBand ?? null, modelVersion: ai.modelVersion ?? null };
  // (sau này thêm Redis lock để chống double-
}

}