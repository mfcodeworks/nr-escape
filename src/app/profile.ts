export class Profile {
    id: number;
    username: string;
    profilePic: string;
    bio: string;
    postCount: number;
    followingCount: number;
    followerCount: number;
    contactInfo: object;
    followers: number[];
    following: number[];
    posts: number[];

    constructor(values: object = {}) {
        Object.assign(this, values);
    }
}
