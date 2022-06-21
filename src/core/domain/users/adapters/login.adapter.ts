import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";
import { ClassValidator } from "../../../common/utils/class-validator";
import { plainToClass } from "class-transformer";
import { LoginUserDto } from "../dtos/login-user.dto";

export class LoginAdapter extends ClassValidator {
    @MinLength(5)
    @MaxLength(100)
    @IsEmail()
    email: string;

    @MinLength(8)
    @IsString()
    password: string;

    public static async new(payload: LoginUserDto) {
        const adapter = plainToClass(LoginAdapter, payload);
        await adapter.validate();
        return adapter;
    }
}