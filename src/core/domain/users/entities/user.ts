import { IsBoolean, IsEmail, IsString, MaxLength, MinLength, validate } from "class-validator";
import { plainToClass } from "class-transformer";
import { CreateUserEntity } from "./types/create-user-entity";
import { HashHelper } from "../../../common/hash/hash-helper";

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

    public async hashPassword() {
        this.password = await HashHelper.hash(this.password);
    }

    public static async new(payload: CreateUserEntity): Promise<User> {
        const user = plainToClass(User, payload);
        await user.hashPassword();
        const sth = await validate(user);
        if (sth.length > 0)
            // for now
            throw "User validation failed";
        return user;
    }
}