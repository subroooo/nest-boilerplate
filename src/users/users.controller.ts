import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CreateDto } from './dto/create.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  async create(@Body() createDto: CreateDto) {
    await this.usersService.create(createDto);
    return 'successful user create';
  }

  @Get(':userNo')
  async findUnique(
    @Param('userNo', ParseIntPipe) userNo: number,
  ): Promise<any> {
    const user = await this.usersService.findUnique(userNo);

    return { user };
  }

  @Get('find-first')
  async findFirst(): Promise<any> {
    return await this.usersService.findFirst();
  }

  @Get('find-many')
  async findMany(): Promise<any> {
    return await this.usersService.findMany();
  }

  @Delete(':userNo')
  async delete(@Param('userNo', ParseIntPipe) userNo: number) {
    return await this.usersService.delete(userNo);
  }

  @Get('pagination')
  async pagination(
    @Query(new ValidationPipe({ transform: true })) pagination: PaginationDto,
  ) {
    const [users, userCount] = await this.usersService.pagination(pagination);

    return {
      users,
      maxPage: Math.ceil(userCount / pagination.take),
    };
  }

  @Patch('update-many')
  async updateMany() {
    return await this.usersService.updateMany();
  }

  @Patch(':userNo')
  async update(
    @Param('userNo', ParseIntPipe) userNo: number,
    @Body() updateDto,
  ) {
    return await this.usersService.update(userNo, updateDto);
  }

  @Patch('/upsert/:userNo')
  async upsert(
    @Param('userNo', ParseIntPipe) userNo: number,
    @Body() updateDto,
  ) {
    return await this.usersService.upsert(userNo, updateDto);
  }
}
