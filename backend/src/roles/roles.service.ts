import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';


@Injectable()
export class RolesService {
  constructor(private prismaService: PrismaService) {
  }
  async create(name : string) {
    console.log("Creating role with name:", name);
    const existingRole =await this.prismaService.role.findUnique({where :{name}})

    if (existingRole ) {
      throw new ConflictException(`Role with name ${name} already exists`);
    }
    return this.prismaService.role.create({data : {name}});
  }

  findAll() {
    return this.prismaService.role.findMany();
  }

  async findOne(id: number) {
    return this.prismaService.role.findUnique({where :{id}}) ;
  }
}
