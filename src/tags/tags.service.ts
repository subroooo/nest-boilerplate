import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TagsService {
  constructor(private readonly prisma: PrismaService) {}

  async createFakerTag() {
    const content = [
      'ootd',
      '맛집',
      '뷰',
      '한강',
      '갱',
      'coding',
      'coders',
      '헬스',
    ];
    let i = 0;
    while (i < 100) {
      const newTag = await this.prisma.tag.create({
        data: {
          content: content[i % 7],
          posts: Math.round(Math.random() * 100),
        },
      });

      i++;
    }
  }

  async aggregate() {
    return await this.prisma.tag.aggregate({
      _count: true,
      _avg: {
        posts: true,
      },
      _sum: {
        posts: true,
      },
      _max: {
        posts: true,
      },
      _min: {
        posts: true,
      },
    });
  }

  async findMany() {
    return await this.prisma.tag.findMany({
      take: 100,
      orderBy: {
        tag_id: 'desc',
      },
    });
  }

  async distinct() {
    return await this.prisma.tag.findMany({
      orderBy: {
        tag_id: 'desc',
      },
      distinct: ['content'],
    });
  }

  async groupBy() {
    return await this.prisma.tag.groupBy({
      by: ['content'],
      _count: {
        _all: true,
      },
      _sum: {
        posts: true,
      },
      _avg: {
        posts: true,
      },
      having: {
        posts: {
          _avg: {
            gt: 50,
          },
        },
      },
    });
  }
}
