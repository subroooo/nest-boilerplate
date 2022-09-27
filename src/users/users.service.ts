import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignUpDto } from './dto/sign-up.dto';
import { v4 as uuid } from 'uuid';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async signUp(signUpDto: SignUpDto): Promise<void> {
    await this.prisma.user.create({
      data: {
        nickname: signUpDto.nickname,
        email: signUpDto.email,
        password: signUpDto.password,
        provider: signUpDto.provider,
        agree: signUpDto.agree,
        name: signUpDto.name,
      },
    });
  }

  async getAllUsers() {
    return await this.prisma.user.findMany();
  }

  async signDown(userNo: number) {
    return await this.prisma.user.delete({
      where: {
        user_id: userNo,
      },
    });
  }

  async pagination({ page, take }: PaginationDto) {
    return await this.prisma.user.findMany({
      take: take,
      skip: take * (page - 1),
    });
  }
}
