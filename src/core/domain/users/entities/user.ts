import { IsBoolean, IsEmail, IsString, MaxLength, MinLength } from "class-validator";
import { plainToClass } from "class-transformer";
import { CreateUserEntity } from "./types/create-user-entity";
import { HashHelper } from "../../../common/utils/hash-helper";
import { Entity } from "../../../common/entity/entity";

export class User extends Entity {
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
        await user.validate();
        await user.hashPassword();
        return user;
    }

    public static async loadExisting(payload: CreateUserEntity) {
        const user = plainToClass(User, payload);
        await user.validate();
        return user;
    }

    private async hashPassword() {
        this.password = await HashHelper.hash(this.password);
    }
}