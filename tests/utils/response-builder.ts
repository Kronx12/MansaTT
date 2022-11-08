import {apiResponseBuilder} from "../../src/utils/response-builder";
import {ApiErrors} from "../../src/enums/api-errors";

describe("utils/response-builder/apiResponseBuilder", () => {
    test("default 500 response", async () => {
        const result = apiResponseBuilder();
        expect(result).toEqual({
            status: 500,
            response: {
                error: ApiErrors.INTERNAL_SERVER
            }
        });
    });

    test("200 response without content", async () => {
        const result = apiResponseBuilder(200);
        expect(result).toEqual({
            status: 200,
            response: {}
        });
    });

    test("200 response with content", async () => {
        const result = apiResponseBuilder(200, null, { content: "content" });
        expect(result).toEqual({
            status: 200,
            response: {
                content: "content"
            }
        });
    });

    test("404 response", async () => {
        const result = apiResponseBuilder(404, ApiErrors.NOT_FOUND);
        expect(result).toEqual({
            status: 404,
            response: {
                content: ApiErrors.NOT_FOUND
            }
        });
    });
})

