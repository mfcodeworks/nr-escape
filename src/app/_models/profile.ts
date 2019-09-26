import { Post } from './post';

export class Profile {
    id: number;
    username: string;
    profilePic: string;
    bio: string;
    postsCount: number;
    followingCount: number;
    followersCount: number;
    contactInfo: any;
    followers: number[];
    following: number[];
    fcmToken: string;
    recentPosts?: Post[];

    constructor(values: any = {}) {
        Object.assign(this, values);
    }
}
