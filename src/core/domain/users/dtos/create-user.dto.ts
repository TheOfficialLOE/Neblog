import { IsBoolean, IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto{
    @MinLength(5)
    @MaxLength(100)
    @IsEmail()
    email: string;

    @MinLength(8)
    @IsString()
    password: string;

    @IsBoolean()
    acceptTermsAndConditions: boolean;
}