import {build, clearUsersTable, mockedUser, resetUsersTable} from "../../helpers";
import {loginUser} from "../../../src/services/user-service";
import {ApiErrors} from "../../../src/enums/api-errors";
import {User} from "../../../src/models/user-model";

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

test("loginUser invalid user", async () => {
    const result = await loginUser(mockedUser);
    expect(result).toEqual({
        status: 404,
        response: {
            error: ApiErrors.USER_NOT_FOUND
        }
    });
});

test("loginUser invalid password", async () => {
    await resetUsersTable();

    let copiedUser = mockedUser;
    copiedUser.password = "invalid_password";
    const result = await loginUser(copiedUser);
    expect(result).toEqual({
        status: 403,
        response: {
            error: ApiErrors.INVALID_PASSWORD
        }
    });
});


test("loginUser valid user", async () => {
    await resetUsersTable();

    const result = await loginUser(mockedUser);
    expect(result).toEqual({
        status: 200,
        response: {
            name: mockedUser.name
        }
    });
});

