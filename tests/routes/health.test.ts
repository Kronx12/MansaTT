import { build } from "../helpers";

describe("route: /health", () => {
    const app = build();

    test("health check route", async () => {
        const res = await app.inject({
            url: "/health"
        });
        expect(res.json()).toEqual({});
    });
})

