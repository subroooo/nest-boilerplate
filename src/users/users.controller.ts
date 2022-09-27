import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto) {
    await this.usersService.signUp(signUpDto);
  }

  @Get()
  async getAllUsers(): Promise<any> {
    const users = await this.usersService.getAllUsers();
    console.log(users);
    return users;
  }

  @Delete(':userNo')
  async signDown(@Param('userNo', ParseIntPipe) userNo: number) {
    return await this.usersService.signDown(userNo);
  }

  @Get('pagination')
  async pagination(
    @Query(new ValidationPipe({ transform: true })) pagination: PaginationDto,
  ) {
    return await this.usersService.pagination(pagination);
  }
}
