import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  async createFakerTag() {
    await this.tagsService.createFakerTag();
  }

  @Get('find-many')
  async findMany() {
    return await this.tagsService.findMany();
  }

  @Get('aggregate')
  async aggregate() {
    return await this.tagsService.aggregate();
  }

  @Get('distinct')
  async distinct() {
    return await this.tagsService.distinct();
  }

  @Get('groupby')
  async groupBy() {
    return await this.tagsService.groupBy();
  }
}
