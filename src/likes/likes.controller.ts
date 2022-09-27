import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { LikesService } from './likes.service';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}
  @Post('like')
  async like(@Body() likeDto) {
    return await this.likesService.like(likeDto);
  }

  @Get('like/:id')
  async getLike(@Param('id', ParseIntPipe) id: number) {
    return await this.likesService.getLike(id);
  }
}
