import knex, { Knex } from "knex";
import 'dotenv/config';

export let connection: Knex | null = null;

export async function initConnection() {
    if (connection != null)
        await connection.destroy();
    connection = knex({
        client: "pg",
        connection: {
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.APP_ENV + "_db",
        },
        searchPath: [process.env.APP_ENV + "_db", "public"]
    })
}

export async function initDatabase() {
    await initConnection();
    await connection!.schema.hasTable("users").then((exist: boolean) => {
        if (!exist) {
            return connection!.schema.createTable("users", tableBuilder => {
                tableBuilder.increments();
                tableBuilder.string("name", 50).unique();
                tableBuilder.string("email", 255).unique();
                tableBuilder.string("password", 255);
            });
        }
    });
}