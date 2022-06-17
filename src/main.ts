import "dotenv/config";
import { Server } from "./application/server";

(async function bootstrap() {
    const server = Server.build();
    await server.run();
})()
