import { IsBoolean, IsEmail, IsString, MaxLength, MinLength, validate, ValidationError } from "class-validator";
import { plainToClass } from "class-transformer";
import { CreateUserEntity } from "./types/create-user-entity";
import { HashHelper } from "../../../common/hash/hash-helper";
import { BadRequestException, Optional } from "@nestjs/common";

export class User {
    @MinLength(5)
    @MaxLength(100)
    @IsEmail()
    email: string;

    @MinLength(8)
    @IsString()
    password: string;

    @IsBoolean()
    acceptTermsAndConditions: boolean;

    public static async new(payload: CreateUserEntity): Promise<User> {
        const user = plainToClass(User, payload);
        await user.validateEntity();
        await user.hashPassword();
        return user;
    }

    private async validateEntity() {
        const validationErrors: ValidationError[] = await validate(this);
        if (validationErrors.length > 0) {
            const errorDetails = []
            for (const error of validationErrors) {
                errorDetails.push(...Object.values(error.constraints));
            }
            throw new BadRequestException(errorDetails);
        }
    }

    private async hashPassword() {
        this.password = await HashHelper.hash(this.password);
    }
}