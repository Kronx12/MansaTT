import {RouteOptions} from "fastify";

export const HealthRoute: RouteOptions = {
    method: 'GET',
    url: '/health',
    handler: (req, rep) => {
        rep.send({})
    }
}