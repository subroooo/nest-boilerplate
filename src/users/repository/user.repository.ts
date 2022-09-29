import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {
    prisma.$on<any>('query', (e: Prisma.QueryEvent) => {
      console.log(e.query);
      console.log(e.params);
      console.log(e.duration);
    });
  }
  async test() {
    return await this.prisma.$queryRaw(Prisma.sql`SELECT * FROM user`);
  }
}
