import { IsBoolean, IsEmail, IsString, MaxLength, MinLength } from "class-validator";
import { ClassValidator } from "../../../common/utils/class-validator";
import { CreateUserDto } from "../dtos/create-user.dto";
import { plainToClass } from "class-transformer";
import { BadRequestException } from "@nestjs/common";

export class SignupAdapter extends ClassValidator {
    @MinLength(5)
    @MaxLength(100)
    @IsEmail()
    email: string;

    @MinLength(8)
    @IsString()
    password: string;

    @IsBoolean()
    acceptTermsAndConditions: boolean;

    public static async new(payload: CreateUserDto) {
        if (!payload.acceptTermsAndConditions)
            throw new BadRequestException("You must accept the terms and conditions");
        const adapter = plainToClass(SignupAdapter, payload);
        await adapter.validate();
        return adapter;
    }
}