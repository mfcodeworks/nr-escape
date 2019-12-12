import { Post } from './post';

export class Profile {
    id: number;
    username: string;
    email?: string;
    profilePic: string;
    bio: string;
    postsCount?: number | string;
    followingCount?: number | string;
    followersCount?: number | string;
    contactInfo?: any;
    followers?: any[];
    following?: any[];
    fcmToken?: string;
    recentPosts?: Post[];
    settings: any;

    constructor(values: any = {}) {
        Object.assign(this, values);
        if (!values.hasOwnProperty('postsCount')) {
            this.postsCount = '?';
        }
        if (!values.hasOwnProperty('followersCount')) {
            this.followersCount = '?';
        }
        if (!values.hasOwnProperty('followingCount')) {
            this.followingCount = '?';
        }
    }
}
