import { applyDecorators, UseGuards } from "@nestjs/common";
import { HttpRoleAuthGuard } from "../guards/http-role.guard";

export const Protected = () => {
    return applyDecorators(
        UseGuards(HttpRoleAuthGuard)
    )
}