import App from './app'

const PORT: any = process.env.APP_PORT || 3000;
const fastify = App();

const start = async () => {
    try {
        await fastify.listen({ port: PORT });
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
}

start();
