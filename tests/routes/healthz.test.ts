import { build } from "../helpers";

let app: any;

beforeAll(async  () => {
    app = await build();
    await app.ready();
});

afterAll(async () => {
    await app.close();
});

test("healthz check route", async () => {
    const res = await app.inject({
        url: "/healthz"
    });
    expect(res.json()).toEqual({});
    app.close();
});

