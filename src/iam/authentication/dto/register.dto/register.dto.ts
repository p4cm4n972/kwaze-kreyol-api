import { IsBoolean, IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  pseudo: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  @IsBoolean()
  @IsNotEmpty()
  isEmailVerified: boolean;
}
