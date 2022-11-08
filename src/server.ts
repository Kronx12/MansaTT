import { build } from './app'
import 'dotenv/config';

const PORT: any = process.env.APP_PORT || 3000;

build().then(app => app.listen({ port: PORT }, (err: any, address: any) => {
    if (err) {
        app.log.error(err);
        process.exit(1);
    }
}));
