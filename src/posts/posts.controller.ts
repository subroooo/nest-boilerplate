import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  async createFakerPost() {
    await this.postsService.createFakerPost();
  }

  @Get('find-many')
  async findMany(): Promise<any> {
    return await this.postsService.findMany();
  }

  @Post('connect')
  async connect(@Body() createDto) {
    await this.postsService.connect(createDto);
  }
}
