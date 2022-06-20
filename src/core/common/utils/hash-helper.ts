
import * as bcrypt from 'bcrypt';
import { ServerKeys } from "../../../infrastructure/config/server-keys";

export class HashHelper {
    public static async hash(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(ServerKeys.SALT_ROUNDS);
        return await bcrypt.hash(password, salt);
    }

    public static async compare(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }
}