import { NestFactory } from "@nestjs/core";
import { AppModule } from "./modules/app.module";
import { ServerKeys } from "../infrastructure/config/server-keys";
import { Logger } from "@nestjs/common";

export class Server {

    private readonly logger = new Logger();
    private readonly PORT = ServerKeys.PORT;

    async run() {
        const app = await NestFactory.create(AppModule);

        await app.listen(process.env.PORT);

        this.log();
    }

    private log() {
        this.logger.log(`Listening on port ${this.PORT}`);
    }

    public static build(): Server {
        return new Server();
    }
}