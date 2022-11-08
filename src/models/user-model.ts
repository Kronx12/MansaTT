export const USER_NAME_REGEX = '^[a-zA-Z0-9]{4,50}$';
export const USER_EMAIL_REGEX = '^(?=.{3,255}$)[a-z0-9]+@[a-z0-9]+$';
export const USER_PASSWORD_REGEX = '^[a-zA-Z0-9]{8,255}$';

export class User {
    id?: number;
    name?: string;
    email?: string;
    password?: string;

    constructor(id?: number, name?: string, email?: string, password?: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    public static fromObject(value: any) {
        return new User(value.id, value.name, value.email, value.password);
    }
}
