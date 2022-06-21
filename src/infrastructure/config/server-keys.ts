import { get } from "env-var";

export class ServerKeys {
    public static readonly PORT = get("PORT").required().asPortNumber();
    public static readonly SALT_ROUNDS = get("SALT_ROUNDS").required().asInt();
    public static readonly JWT_SECRET = get("JWT_SECRET").required().asString();
    public static readonly JWT_EXPIRES_IN = get("JWT_EXPIRES_IN").required().asString();
}