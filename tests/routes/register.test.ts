import { build, clearUsersTable, resetUsersTable } from "../helpers";
import { ApiErrors } from "../../src/enums/api-errors";

let app: any;

beforeAll(async  () => {
    app = await build();
    await app.ready();
});

afterAll(async () => {
    await app.close();
});

beforeEach(async () => {
    await clearUsersTable();
})

test("missing body", async () => {
    const result = await app.inject({
        url: "/register",
        method: "POST"
    });
    expect(result.json()).toEqual({
        "error": "Bad Request",
        "message": "body must be object",
        "statusCode": 400
    });
});

test("missing name in body", async () => {
    const result = await app.inject({
        url: "/register",
        method: "POST",
        payload: {
            email: "email@email",
            password: "password"
        }
    });
    expect(result.json()).toEqual({
        "error": "Bad Request",
        "message": "body must have required property 'name'",
        "statusCode": 400
    });
});

test("missing email in body", async () => {
    const result = await app.inject({
        url: "/register",
        method: "POST",
        payload: {
            name: "username",
            password: "password"
        }
    });
    expect(result.json()).toEqual({
        "error": "Bad Request",
        "message": "body must have required property 'email'",
        "statusCode": 400
    });
});

test("missing password in body", async () => {
    const result = await app.inject({
        url: "/register",
        method: "POST",
        payload: {
            name: "username",
            email: "email@email"
        }
    });
    expect(result.json()).toEqual({
        "error": "Bad Request",
        "message": "body must have required property 'password'",
        "statusCode": 400
    });
});

test("invalid name format", async () => {
    const result = await app.inject({
        url: "/register",
        method: "POST",
        payload: {
            name: "us",
            email: "email@email",
            password: "password"
        }
    });
    expect(result.json()).toEqual({
        "error": "Bad Request",
        "message": "body/name must match pattern \"^[a-zA-Z0-9]{4,50}$\"",
        "statusCode": 400
    });
});

test("invalid email format", async () => {
    const result = await app.inject({
        url: "/register",
        method: "POST",
        payload: {
            name: "username",
            email: "email",
            password: "password"
        }
    });
    expect(result.json()).toEqual({
        "error": "Bad Request",
        "message": "body/email must match pattern \"^(?=.{3,255}$)[a-z0-9]+@[a-z0-9]+$\"",
        "statusCode": 400
    });
});

test("invalid password format", async () => {
    const result = await app.inject({
        url: "/register",
        method: "POST",
        payload: {
            name: "username",
            email: "email@email",
            password: "pa"
        }
    });
    expect(result.json()).toEqual({
        "error": "Bad Request",
        "message": "body/password must match pattern \"^[a-zA-Z0-9]{8,255}$\"",
        "statusCode": 400
    });
});

test("Create user", async () => {
    const result = await app.inject({
        url: "/register",
        method: "POST",
        payload: {
            name: "username",
            email: "email@email",
            password: "password"
        }
    });
    expect(result.json()).toEqual({
        status: 201,
        response: {}
    });
})

test("User already exist", async () => {
    await resetUsersTable();

    const result = await app.inject({
        url: "/register",
        method: "POST",
        payload: {
            name: "username",
            email: "email@email",
            password: "password"
        }
    });
    expect(result.json()).toEqual({
        status: 409,
        response: {
            error: ApiErrors.USER_ALREADY_EXIST
        }
    });
});
