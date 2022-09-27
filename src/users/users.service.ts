import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDto } from './dto/create.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { response } from 'express';

const userResponse = {
  user_id: true,
  nickname: true,
  email: true,
  provider: true,
  name: true,
};

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDto: CreateDto): Promise<void> {
    await this.prisma.user.create({
      data: {
        nickname: createDto.nickname,
        email: createDto.email,
        password: createDto.password,
        provider: createDto.provider,
        agree: createDto.agree,
        name: createDto.name,
      },
    });
  }

  async findMany() {
    return await this.prisma.user.findMany();
  }

  async findUnique(userNo: number) {
    return await this.prisma.user.findUnique({
      where: {
        user_id: userNo,
      },
      select: userResponse,
    });
  }

  async findFirst() {
    return await this.prisma.user.findFirst({
      where: {
        provider: 'KAKAO',
      },
      orderBy: {
        user_id: 'asc',
      },
    });
  }

  async delete(userNo: number) {
    return await this.prisma.user.delete({
      where: {
        user_id: userNo,
      },
    });
  }

  async pagination({ page, take }: PaginationDto) {
    return await Promise.all([
      this.prisma.user.findMany({
        take: take,
        skip: take * (page - 1),
        orderBy: {
          user_id: 'asc',
        },
      }),
      this.prisma.user.count(),
    ]);
  }

  async updateMany() {
    return await this.prisma.user.updateMany({
      where: {
        provider: 'KAKAO',
      },
      data: {
        provider: 'LOCAL',
      },
    });
  }

  async update(userNo, updateDto) {
    return await this.prisma.user.update({
      where: {
        user_id: userNo,
      },
      data: { ...updateDto },
      select: userResponse,
    });
  }
  async upsert(userNo, updateDto) {
    return await this.prisma.user.upsert({
      where: {
        user_id: userNo,
      },
      update: { ...updateDto },
      create: {
        ...updateDto,
      },
    });
  }
}
