import { Profile } from './profile';

export class User extends Profile {
    email: string;
    key: string;

    constructor(values: object = {}) {
        super(values);
        Object.assign(this, values);
    }
}
