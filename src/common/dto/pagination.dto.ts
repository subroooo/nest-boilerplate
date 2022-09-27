import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class PaginationDto {
  @Type(() => Number)
  @IsNumber()
  page: number;

  @Type(() => Number)
  @IsNumber()
  take: number;
}
