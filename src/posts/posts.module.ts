import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { UserRepository } from 'src/users/repository/user.repository';

@Module({
  imports: [],
  controllers: [PostsController],
  providers: [PostsService, UserRepository],
})
export class PostsModule {}
