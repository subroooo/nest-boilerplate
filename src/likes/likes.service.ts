import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';

@Injectable()
export class LikesService {
  constructor(private readonly prisma: PrismaService) {}
  async like({ authorId, postId }) {
    await this.prisma.likes.create({
      data: {
        author_id: authorId,
        post_id: postId,
      },
    });
  }

  async getLike(id) {
    return await this.prisma.likes.findMany({
      where: {
        author_id: id,
      },
      select: {
        author: {
          select: {
            user_id: true,
          },
        },
        post: {
          include: {
            author: true,
          },
        },
      },
    });
  }
}
