import fastify from "fastify";
import { initDatabase } from "./database/connection";
import { healthz } from "./routes/healthz-route";
import { register } from "./routes/register-route";
import { login } from "./routes/login-route";

export const build = (opts = {}): Promise<any> => {
    return new Promise(resolve => {
        initDatabase().then(r => {
            const app = fastify(opts);

            app.register(healthz);
            app.register(register);
            app.register(login);

            resolve(app);
        });
    })
}

