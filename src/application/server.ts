import { NestFactory } from "@nestjs/core";
import { AppModule } from "./modules/app.module";
import { ServerKeys } from "../infrastructure/config/server-keys";
import { INestApplication, ValidationPipe } from "@nestjs/common";

export class Server {

    private readonly PORT = ServerKeys.PORT;

    async run() {
        const app = await NestFactory.create(AppModule);

        Server.usePipes(app);

        await app.listen(process.env.PORT);

        this.log();
    }

    private log() {
        console.log(`Listening on port ${this.PORT}`)
    }

    private static usePipes(app: INestApplication) {
        app.useGlobalPipes(new ValidationPipe({
            stopAtFirstError: true,
        }));
    }

    public static build(): Server {
        return new Server();
    }
}