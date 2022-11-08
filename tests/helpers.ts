import { build as appBuilder } from "../src/app";
import { connection } from "../src/database/connection";
import { User } from "../src/models/user-model";
import { registerUser } from "../src/services/user-service";
import "dotenv/config";

export function build() {
    process.env.APP_ENV = "test";

    return appBuilder();
}

// User table manipulation
export const mockedUser = User.fromObject({
    name: "username",
    email: "email@email",
    password: "password"
})

export async function clearUsersTable() {
    await connection!("users").del();
}

export async function resetUsersTable() {
    await clearUsersTable();
    await registerUser(mockedUser);
}