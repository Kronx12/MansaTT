import { FastifyInstance, FastifyPluginAsync, FastifyPluginOptions } from "fastify";
import { registerUser } from "../services/user-service";
import { User, USER_EMAIL_REGEX, USER_NAME_REGEX, USER_PASSWORD_REGEX } from "../models/user-model";

export const register: FastifyPluginAsync = async (server:  FastifyInstance, opts: FastifyPluginOptions) => {
    server.route({
        method: 'POST',
        url: '/register',
        schema: {
            body: {
                type: 'object',
                required: [
                    'name',
                    'email',
                    'password'
                ],
                properties: {
                    name: {
                        type: 'string',
                        pattern: USER_NAME_REGEX
                    },
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
            registerUser(User.fromObject(req.body)).then(result => rep.send(result));
        }
    })
}