import { build, resetUsersTable } from "../helpers";
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
    await resetUsersTable();
})

test("missing body", async () => {
    const result = await app.inject({
        url: "/login",
        method: "POST"
    });
    expect(result.json()).toEqual({
        "error": "Bad Request",
        "message": "body must be object",
        "statusCode": 400
    });
});

test("missing email in body", async () => {
    const result = await app.inject({
        url: "/login",
        method: "POST",
        payload: {
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
        url: "/login",
        method: "POST",
        payload: {
            email: "email@email"
        }
    });
    expect(result.json()).toEqual({
        "error": "Bad Request",
        "message": "body must have required property 'password'",
        "statusCode": 400
    });
});

test("invalid email format", async () => {
    const result = await app.inject({
        url: "/login",
        method: "POST",
        payload: {
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
        url: "/login",
        method: "POST",
        payload: {
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

test("user not found", async () => {
    const result = await app.inject({
        url: "/login",
        method: "POST",
        payload: {
            email: "wrongemail@email",
            password: "password"
        }
    });
    expect(result.json()).toEqual({
        status: 404,
        response: {
            error: ApiErrors.USER_NOT_FOUND
        }
    });
});

test("invalid password", async () => {
    const result = await app.inject({
        url: "/login",
        method: "POST",
        payload: {
            email: "email@email",
            password: "passsssword"
        }
    });
    expect(result.json()).toEqual({
        status: 403,
        response: {
            error: ApiErrors.INVALID_PASSWORD
        }
    });
});

test("success login", async () => {
    const result = await app.inject({
        url: "/login",
        method: "POST",
        payload: {
            email: "email@email",
            password: "password"
        }
    });
    expect(result.json()).toEqual({
        status: 200,
        response: {
            name: "username"
        }
    });
});

