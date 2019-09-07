import { Post } from './post';
import { map } from 'rxjs/operators';

export class Profile {
    id: number;
    username: string;
    profilePic: string;
    bio: string;
    postCount: number;
    followingCount: number;
    followerCount: number;
    contactInfo: any;
    followers: number[];
    following: number[];
    posts: Post[];
    fcm: string;

    constructor(values: any = {}) {
        this.id = values.id;
        this.username = values.username;
        this.profilePic = values.profile_pic;
        this.bio = values.bio;
        this.postCount = values.posts_count;
        this.followingCount = values.following_count;
        this.followerCount = values.followers_count;
        this.contactInfo = values.contact_info;
        this.followers = values.followers;
        this.following = values.following;
        if (values.recent_posts) {
            values.recent_posts.map(post =>
                new Post(post)
            );
        }
        this.posts = values.recent_posts;
        this.fcm = values.fcm_token;
    }
}
