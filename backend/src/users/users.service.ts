import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  create(createUserDto: CreateUserDto) {
    const { email, password, name, roleId } = createUserDto;
    return this.prisma.user.create({
      data: {
        email,
        password,
        name,
        roleId,
      },
    });
  }
  findAll() {
    return this.prisma.user.findMany();
  }
  findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({ where: { id } })
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({ where: { id }, data: updateUserDto });
  }

  remove(id: number) {
    return this.prisma.user.delete({ where: { id } })
  }


}
