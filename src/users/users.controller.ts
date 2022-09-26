import { Controller, Get } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly prismaService: PrismaService,
  ) {}
  @Get('users')
  async getAllUsers(): Promise<any> {
    const a = await this.prismaService.user.findMany();
    console.log(a);
  }
}
