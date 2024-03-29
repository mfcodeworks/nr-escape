import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ApiService } from '../api/api.service';
import { Profile } from '../../_models/profile';
import { Post } from '../../_models/post';
import { Comment } from '../../_models/comment';
import { Notification } from '../../_models/notification';
import { CacheService } from '../cache/cache.service';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
    profiles: Profile[] = [];
    posts: Post[] = [];
    comments: Comment[] = [];
    notifications: Notification[] = [];

    constructor(
        private api: ApiService,
        private cache: CacheService
    ) {}

    // Sign Up User
    signUp(username: string, password: string, email: string): any {
        return this.api.signUp(username, password, email);
    }

    // Sign In User
    signIn(username: string, password: string): any {
        return this.api.signIn(username, password);
    }

    // Send User Forgot Password Request
    forgotPassword(email: string): any {
        return this.api.forgotPassword(email);
    }

    // Reset User Password
    resetPassword(token: string, email: string, password: string, passwordConfirmation: string): any {
        return this.api.resetPassword(token, email, password, passwordConfirmation);
    }

    // Get User Profile
    getUser(): Observable<Profile> {
        return this.api.getUser();
    }

    // Get User Blocked Profiles
    getUserBlocks(): Observable<Profile[]> {
        return this.api.getUserBlocks();
    }

    // Update User Profile
    updateUser(user: Profile | FormData): Observable<Profile> {
        return this.api.updateUser(user);
    }

    // Deactivate user profile
    deactivateProfile(): any {
        return this.api.deactivateProfile();
    }

    // Save FCM Token
    saveFcm(token: string): any {
        return this.api.saveFcm(token);
    }

    // Subscribe to FCM Topic
    subscribeFcm(token: string, topic: string): any {
        return this.api.subscribeFcm(token, topic);
    }

    // Unsubcribe from FCM Topic
    unsubscribeFcm(token: string, topic: string): any {
        return this.api.unsubscribeFcm(token, topic);
    }

    // User search
    search(query: string, type: string = null, topNotIn?: number[], recentNotIn?: number[]): Observable<any[]> {
        return this.api.search(query, type).pipe(
            catchError((error) => {
                // Return from localStorage
                if (type === 'hashtag') {
                    return this.cache.get(`hashtag-${query}`);
                }
                return this.cache.get(`search-${query}`);
            })
        );
    }

    // Get User Feed
    getUserFeed(offset?: number): Observable<Post[]> {
        return this.api.getUserFeed(offset).pipe(
            catchError((error) => {
                // Return from localStorage
                return this.cache.get('feed');
            })
        );
    }

    // Get Recommended Users
    getRecommendations(notIn?: number[]): Observable<Post[]> {
        return this.api.getRecommendations(notIn).pipe(
            catchError((error) => {
                // Return from localStorage
                return this.cache.get('recommendations');
            })
        );
    }

    // Get User Engagement Score
    getEngagementScore(): any {
        return this.api.getEngagementScore();
    }

    // Get User Notifications
    getUserNotifications(offset?: number): Observable<Notification[]> {
        return this.api.getUserNotifications(offset).pipe(
            catchError((error) => {
                // Return from localStorage
                return this.cache.get('notifications');
            })
        );
    }

    // Get Notification
    getNotification(id: number): Observable<Notification> {
        return this.api.getNotification(id);
    }

    // Get Profile
    getProfile(username: string): Observable<Profile> {
        return this.api.getProfile(username).pipe(
            catchError((error) => {
                // Return from localStorage
                return this.cache.get(`profile-${username}`);
            })
        );
    }

    // Get Profile Posts
    getProfilePosts(username: string, offset?: number): Observable<Post[]> {
        return this.api.getProfilePosts(username, offset).pipe(
            catchError((error) => {
                // Return from localStorage
                return this.cache.get(`profile-${username}-posts`);
            })
        );
    }

    // Get Post
    getPost(id: number): Observable<Post> {
        return this.api.getPost(id).pipe(
            catchError((error) => {
                // Return from localStorage
                return this.cache.get(`post-${id}`);
            })
        );
    }

    // Create Post
    addPost(post: any): Observable<Post> {
        return this.api.addPost(post);
    }

    // Update Post
    updatePost(id: number, post: Post): Observable<Post> {
        return this.api.updatePost(id, post);
    }

    // Delete Post
    deletePost(id: number): any {
        return this.api.deletePost(id);
    }

    // Get Comment
    getComment(id: number): Observable<Comment> {
        return this.api.getComment(id);
    }

    // Create Comment
    addComment(comment: Comment): Observable<Comment> {
        return this.api.addComment(comment);
    }

    // Update Comment
    updateComment(id: number, comment: Comment): Observable<Comment> {
        return this.api.updateComment(id, comment);
    }

    // Delete Comment
    deleteComment(id: number): any {
        return this.api.deleteComment(id);
    }

    // Follow user
    followUser(id: number): any {
        return this.api.followUser(id);
    }

    // Unfollow user
    unfollowUser(id: number): any {
        return this.api.unfollowUser(id);
    }

    // Check follow requested
    checkFollowRequested(id: number): Observable<boolean> {
        return this.api.checkFollowRequested(id);
    }

    // Get follow requests
    getFollowRequests(): Observable<any[]> {
        return this.api.getFollowRequests();
    }

    // Approve follow request
    approveFollower(id: number): any {
        return this.api.approveFollower(id);
    }

    // Decline follow request
    declineFollower(id: number): any {
        return this.api.declineFollower(id);
    }

    // Like Post
    likePost(id: number): any {
        return this.api.likePost(id);
    }

    // Unlike Post
    unlikePost(id: number): any {
        return this.api.unlikePost(id);
    }

    // Block User
    blockUser(id: number): any {
        return this.api.blockUser(id);
    }

    // Unblock User
    unblockUser(id: number): any {
        return this.api.unblockUser(id);
    }

    // Report User
    reportUser(id: number): any {
        return this.api.reportUser(id);
    }

    // Report Post
    reportPost(id: number): any {
        return this.api.reportPost(id);
    }
}
