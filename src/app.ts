import fastify, { FastifyInstance } from "fastify";
import { Server, IncomingMessage, ServerResponse } from "http";
import { HealthRoute } from "./routes/health-route";

const app: FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify();

function build() {
    app.route(HealthRoute);

    return app;
}

export default build;
