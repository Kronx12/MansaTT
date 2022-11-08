import {build, clearUsersTable, mockedUser, resetUsersTable} from "../../helpers";
import {registerUser} from "../../../src/services/user-service";
import {ApiErrors} from "../../../src/enums/api-errors";

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

test("registerUser success", async () => {
    const result = await registerUser(mockedUser);
    expect(result).toEqual({
        status: 201,
        response: {}
    });
});

test("registerUser duplicate keys", async () => {
    await resetUsersTable();

    const result = await registerUser(mockedUser);
    expect(result).toEqual({
        status: 409,
        response: {
            error: ApiErrors.USER_ALREADY_EXIST
        }
    });
});

test("registerUser duplicate keys", async () => {
    await resetUsersTable();

    const result = await registerUser(mockedUser);
    expect(result).toEqual({
        status: 409,
        response: {
            error: ApiErrors.USER_ALREADY_EXIST
        }
    });
});

