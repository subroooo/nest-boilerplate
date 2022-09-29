import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserRepository } from 'src/users/repository/user.repository';

@Injectable()
export class PostsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userRepository: UserRepository,
  ) {}

  async createFakerPost() {
    let i = 0;
    while (i < 100) {
      const author_id = Math.round(Math.random() * 100);
      const user = await this.prisma.user.findUnique({
        where: { user_id: author_id },
        select: {
          user_id: true,
        },
      });
      if (!user) {
        continue;
      }
      const newPost = await this.prisma.post.create({
        data: {
          content: faker.lorem.paragraphs().slice(0, 254),
          thumbnail: faker.image.imageUrl(),
          author_id,
        },
      });
      i++;
    }
  }

  async connect({ nickname }) {
    const newPost = await this.prisma.post.create({
      data: {
        content: faker.lorem.paragraphs().slice(0, 254),
        thumbnail: faker.image.imageUrl(),
        author: {
          connect: {
            nickname,
          },
        },
      },
    });
  }

  async findMany() {
    return await this.prisma.post.findMany({
      select: {
        post_id: true,
        content: true,
        thumbnail: true,
        created_at: true,
        author: {
          select: {
            user_id: true,
            nickname: true,
          },
        },
      },
    });
  }
}
