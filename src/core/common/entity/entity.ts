import { IsOptional, IsString, IsUUID } from "class-validator";
import { ClassValidator } from "../utils/class-validator";

export class Entity extends ClassValidator {
    @IsString()
    @IsUUID()
    @IsOptional()
    id: string;
}