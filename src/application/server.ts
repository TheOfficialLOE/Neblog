import { NestFactory } from "@nestjs/core";
import { AppModule } from "./modules/app.module";
import { ServerKeys } from "../infrastructure/config/server-keys";

export class Server {

    private readonly PORT = ServerKeys.PORT;

    async run() {
        const app = await NestFactory.create(AppModule);

        await app.listen(process.env.PORT);

        this.log();
    }

    private log() {
        console.log(`Listening on port ${this.PORT}`)
    }

    public static build(): Server {
        return new Server();
    }
}