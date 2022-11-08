import bcrypt from 'bcrypt';
import { connection } from "../database/connection";
import { ApiErrors } from "../enums/api-errors";
import { apiResponseBuilder } from "../utils/response-builder";
import { User } from "../models/user-model";

export function registerUser(user: User): Promise<object> {
    return new Promise((resolve) => {
        connection!("users")
            .select("*")
            .where({name: user.name!})
            .orWhere({email: user.email!})
            .then((rows) => {
                if (rows.length != 0)
                    resolve(apiResponseBuilder(409, ApiErrors.USER_ALREADY_EXIST));
            })
        bcrypt.hash(user.password!, 10).then(hashedPassword => {
            connection!("users")
                .insert({ name: user.name!, email: user.email!, password: hashedPassword })
                .then(() => resolve(apiResponseBuilder(201, null)))
                .catch(() => { resolve(apiResponseBuilder(409, ApiErrors.USER_ALREADY_EXIST)); });
        }).catch(() => resolve(apiResponseBuilder()));
    });
}

export function loginUser(user: User): Promise<object> {
    return new Promise((resolve) => {
        connection!
            .select('*')
            .from('users')
            .where({ email: user.email! })
            .then((result) => {
                if (result.length == 0)
                    resolve(apiResponseBuilder(404, ApiErrors.USER_NOT_FOUND))
                let correspondingUser: User = User.fromObject(result[0]);
                bcrypt.compare(user.password!, correspondingUser.password!).then((password_equals: boolean) => {
                    resolve(password_equals ?
                        apiResponseBuilder(200, null, { name: correspondingUser.name }) :
                        apiResponseBuilder(403, ApiErrors.INVALID_PASSWORD));
                }).catch(() => resolve(apiResponseBuilder()) )
            }).catch(() => resolve(apiResponseBuilder()) );
    });
}