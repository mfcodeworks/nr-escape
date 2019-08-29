import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { UserService } from '../user/user.service';
import { Post } from '../post';
import { Comment } from '../comment';
import { Profile } from '../profile';
import { Notification } from '../notification';

const API_URL = environment.apiUrl;

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(private http: HttpClient, private userService: UserService) {}

    // API: Sign Up User
    signUp(username: string, password: string, email: string): any {
        return this.http
        .post(`${API_URL}/sign-up`, {
            username,
            password,
            email
        }, this.getRequestHeaders())
        .pipe(
            retry(3),
            catchError(this.handleError)
        );
    }

    // API: Sign In User
    signIn(username: string, password: string): any {
        return this.http
        .post(`${API_URL}/sign-in`, {
            username,
            password
        }, this.getRequestHeaders())
        .pipe(
            retry(3),
            catchError(this.handleError)
        );
    }

    // API: Send User Forgot Password Request
    forgotPassword(email: string): any {
        // TODO:
    }

    // API: Reset User Password
    resetPassword(token: string, email: string, password: string, passwordConfirmation: string): any {
        // TODO:
    }

    // API: Get Profile
    getProfile(id: number): Observable<Profile> {
        return this.http
        .get<Profile>(`${API_URL}/profile/${id}`, this.getRequestHeaders())
        .pipe(
            retry(3),
            catchError(this.handleError)
        );
    }

    // API: Update User Profile
    updateProfile() {
        // TODO:
    }

    // API: Deactivate user profile
    deactivateProfile() {
        // TODO:
    }

    // API: Get User Feed
    getUserFeed(id: number): Observable<Post[]> {
        return this.http
        .get<Post[]>(`${API_URL}/feed`, this.getRequestHeaders())
        .pipe(
            retry(3),
            catchError(this.handleError)
        );
    }

    // API: Get Recommended Users
    getRecommendations() {
        // TODO:
    }

    // API: Get User Engagement Score
    getEngagementScore() {
        // TODO:
    }

    // API: Get User Notifications
    getUserNotifications(id: number): Observable<Notification[]> {
        return this.http
        .get<Notification[]>(`${API_URL}/notification?forAuthor=${id}&_limit=20`, this.getRequestHeaders())
        .pipe(
            retry(3),
            catchError(this.handleError)
        );
    }

    // API: Get Notification
    getNotification(id: number): Observable<Notification> {
        return this.http
            .get<Notification>(`${API_URL}/notification/${id}`, this.getRequestHeaders())
            .pipe(
                retry(3),
                catchError(this.handleError)
            );
    }

    // API: Get Post
    getPost(id: number): Observable<Post> {
        return this.http
            .get<Post>(`${API_URL}/post/${id}`, this.getRequestHeaders())
            .pipe(
                retry(3),
                catchError(this.handleError)
            );
    }

    // API: Create Post
    addPost(post: Post): Observable<Post> {
        return this.http
            .post<Post>(`${API_URL}/post`, post, this.getRequestHeaders())
            .pipe(
                retry(3),
                catchError(this.handleError)
            );
    }

    // API: Update Post
    updatePost(id: number, post: Post): Observable<Post> {
        return this.http
            .put<Post>(`${API_URL}/post/${id}`, post, this.getRequestHeaders())
            .pipe(
                retry(3),
                catchError(this.handleError)
            );
    }

    // API: Delete Post
    deletePost(id: number) {
        this.http
            .delete(`${API_URL}/post/${id}`, this.getRequestHeaders())
            .pipe(
                retry(3),
                catchError(this.handleError)
            );
    }

    // API: Get Comment
    getComment(id: number): Observable<Comment> {
        return this.http
            .get<Comment>(`${API_URL}/comment/${id}`, this.getRequestHeaders())
            .pipe(
                retry(3),
                catchError(this.handleError)
            );
    }

    // API: Create Comment
    addComment(comment: Comment): Observable<Comment> {
        return this.http
            .post<Comment>(`${API_URL}/comment`, comment, this.getRequestHeaders())
            .pipe(
                retry(3),
                catchError(this.handleError)
            );
    }

    // API: Update Comment
    updateComment(id: number, comment: Comment): Observable<Comment> {
        return this.http
            .put<Comment>(`${API_URL}/post/${id}`, comment, this.getRequestHeaders())
            .pipe(
                retry(3),
                catchError(this.handleError)
            );
    }

    // API: Delete Comment
    deleteComment(id: number) {
        this.http
            .delete(`${API_URL}/comment/${id}`, this.getRequestHeaders())
            .pipe(
                retry(3),
                catchError(this.handleError)
            );
    }

    // API: Follow user
    followUser() {
        // TODO:
    }

    // API: Unfollow user
    unfollowUser() {
        // TODO:
    }

    // API: Like Post
    likePost() {
        // TODO:
    }

    // API: Unlike Post
    unlikePost() {
        // TODO:
    }

    // API: Block User
    blockUser() {
        // TODO:
    }

    // API: Unblock User
    unblockUser() {
        // TODO:
    }

    // API: Report User
    reportUser() {
        // TODO:
    }

    // API: Report Post
    reportPost() {
        // TODO:
    }

    // Error handling
    handleError(error: any) {
        // DEBUG: Log error
        console.log(error);

        // Instantiate error message
        let errorMessage: string;

        // Set error message
        (error.error instanceof ErrorEvent) ?
            errorMessage = error.error.message :
            errorMessage = `Error Code: ${error.code}\nMessage: ${error.message}`;
        console.log(errorMessage);
        return throwError(errorMessage);
    }

    // Http Headers
    private getRequestHeaders() {
        const headers = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: (this.userService.token) ? `Bearer ${this.userService.token}` : ''
            })
        };
        return headers;
    }
}
