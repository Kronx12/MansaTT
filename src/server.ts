import { build } from './app'
import 'dotenv/config';

const PORT: number = Number(process.env.APP_PORT || "3000");

build().then((app: any) => app.listen({ port: PORT }, (err: unknown, address: unknown) => {
    if (err) {
        app.log.error(err);
        process.exit(1);
    }
}));
