import { FastifyInstance, FastifyPluginAsync, FastifyPluginOptions } from "fastify";
import { loginUser } from "../services/user-service";
import { User, USER_EMAIL_REGEX, USER_PASSWORD_REGEX } from "../models/user-model";

export const login: FastifyPluginAsync = async (server:  FastifyInstance, opts: FastifyPluginOptions) => {
    server.route({
        method: 'POST',
        url: '/login',
        schema: {
            body: {
                type: 'object',
                required: [
                    'email',
                    'password'
                ],
                properties: {
                    email: {
                        type: 'string',
                        pattern: USER_EMAIL_REGEX
                    },
                    password: {
                        type: 'string',
                        pattern: USER_PASSWORD_REGEX
                    }
                }
            }
        },
        handler: (req: any, rep: any) => {
            loginUser(User.fromObject(req.body)).then(result => rep.send(result));
        }
    })
}