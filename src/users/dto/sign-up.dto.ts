import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class SignUpDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  nickname: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsOptional()
  @IsString()
  provider: string;

  @IsBoolean()
  @IsNotEmpty()
  agree: boolean;
}
