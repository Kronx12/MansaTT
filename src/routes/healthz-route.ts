import { FastifyInstance, FastifyPluginAsync, FastifyPluginOptions } from "fastify";

export const healthz: FastifyPluginAsync = async (server:  FastifyInstance, opts: FastifyPluginOptions) => {
    server.route({
        method: 'GET',
        url: '/healthz',
        handler: (req, rep) => {
            rep.send({})
        }
    })
}