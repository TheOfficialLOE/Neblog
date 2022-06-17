import { CreateUserDto } from "../dtos/create-user.dto";
import { plainToClass } from "class-transformer";

export class CreateUserAdapter {
    email: string;
    password: string;
    acceptTermsAndConditions: boolean;

    public static new(dto: CreateUserDto) {
        const adapter = plainToClass(CreateUserAdapter, dto);
        return adapter;
    }
}