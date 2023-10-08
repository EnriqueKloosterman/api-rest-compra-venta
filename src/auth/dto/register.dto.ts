import { Transform } from 'class-transformer';
import { MinLength, IsString, IsEmail, IsInt, IsDate } from 'class-validator';

export class RegisterDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  @MinLength(3)
  last_name: string;

  @IsString()
  @MinLength(3)
  business_name: string;

  @IsEmail()
  email: string;

  @IsInt()
  phone: number;

  @IsString()
  @MinLength(6)
  @Transform(({ value }) => value.trim())
  password: string;

//   @IsDate()
//   created_at: Date;
}
