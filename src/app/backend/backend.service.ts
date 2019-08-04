import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../api/api.service';
import { Profile } from '../profile';
import { Post } from '../post';
import { Comment } from '../comment';
import { Notification } from '../notification';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
    profiles: Profile[] = [];
    posts: Post[] = [];
    comments: Comment[] = [];
    notifications: Notification[] = [];

    constructor(private api: ApiService) {}

    // Sign Up User
    signUp(username: string, password: string, email: string): any {
        return this.api.signUp(username, password, email);
    }

    // Sign In User
    signIn(username: string, password: string): any {
        return this.api.signIn(username, password);
    }

    // Get User Notifications
    getUserNotifications(id: number): Observable<Notification[]> {
        return this.api.getUserNotifications(id);
    }

    // Get User Feed
    getUserFeed(id: number): Observable<Post[]> {
        return this.api.getUserFeed(id);
    }

    // Get Profile
    getProfile(id: number): Observable<Profile> {
        return this.api.getProfile(id);
    }

    // Get Post
    getPost(id: number): Observable<Post> {
        return this.api.getPost(id);
    }

    // Create Post
    addPost(post: Post): Observable<Post> {
        return this.api.addPost(post);
    }

    // Delete Post
    deletePost(id: number) {
        return this.api.deletePost(id);
    }

    // Update Post
    updatePost(id: number, post: Post): Observable<Post> {
        return this.api.updatePost(id, post);
    }

    // Get Comment
    getComment(id: number): Observable<Comment> {
        return this.api.getComment(id);
    }

    // Create Comment
    addComment(comment: Comment): Observable<Comment> {
        return this.api.addComment(comment);
    }

    // Delete Comment
    deleteComment(id: number) {
        return this.api.deleteComment(id);
    }

    // Update Comment
    updateComment(id: number, comment: Comment): Comment {
        return comment;
    }

    // Get Notification
    getNotification(id: number): Observable<Notification> {
        return this.api.getNotification(id);
    }
}
