import { validate, ValidationError } from "class-validator";
import { BadRequestException } from "@nestjs/common";

export class ClassValidator {
    public async validate() {
        const validationErrors: ValidationError[] = await validate(this);
        if (validationErrors.length > 0) {
            const errorDetails = []
            for (const error of validationErrors) {
                errorDetails.push(...Object.values(error.constraints));
            }
            throw new BadRequestException(errorDetails);
        }
    }
}