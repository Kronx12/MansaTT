import { ApiErrors } from "../enums/api-errors";

export function apiResponseBuilder(status: number = 500, error: ApiErrors | null = ApiErrors.INTERNAL_SERVER, content: object = {}) {
    if (error)
        return { status: status, response: { error: error }}
    return { status: status, response: content }
}
