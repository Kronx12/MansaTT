export const USER_NAME_REGEX = '^[a-zA-Z0-9]{4,50}$';
export const USER_EMAIL_REGEX = '^(?=.{3,255}$)[a-z0-9]+@[a-z0-9]+$';
export const USER_PASSWORD_REGEX = '^[a-zA-Z0-9]{8,255}$';

export class User {
    constructor(
        public id?: number,
        public name?: string,
        public email?: string,
        public password?: string,
    ) {}

    public static fromObject(value: any) {
        return new User(value.id, value.name, value.email, value.password);
    }
}
