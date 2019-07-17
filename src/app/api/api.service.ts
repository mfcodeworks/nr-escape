import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Post } from '../post';
import { Comment } from '../comment';
import { Profile } from '../profile';
import { Notification } from '../notification';

const API_URL = environment.apiUrl;

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(
        private http: HttpClient
    ) {}

    // Http Headers
    headers = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    // API: Get User Notifications
    getUserNotifications(id: number): Observable<Notification[]> {
        return this.http
        .get<Notification[]>(`${API_URL}/notification?forAuthor=${id}&_limit=20`)
        .pipe(
            retry(3),
            catchError(this.handleError)
        );
    }

    // API: Get Profile
    getProfile(id: number): Observable<Profile> {
        return this.http
        .get<Profile>(`${API_URL}/profile/${id}`)
        .pipe(
            retry(3),
            catchError(this.handleError)
        );
    }

    // API: Get Post
    getPost(id: number): Observable<Post> {
        return this.http
            .get<Post>(`${API_URL}/post/${id}`)
            .pipe(
                retry(3),
                catchError(this.handleError)
            );
    }

    // API: Create Post
    addPost(post: Post): Observable<Post> {
        return this.http
            .post<Post>(`${API_URL}/post`, post, this.headers)
            .pipe(
                retry(3),
                catchError(this.handleError)
            );
    }

    // API: Delete Post
    deletePost(id: number) {
        this.http
            .delete(`${API_URL}/post/${id}`, this.headers)
            .pipe(
                retry(3),
                catchError(this.handleError)
            );
    }

    // API: Update Post
    updatePost(id: number, post: Post): Observable<Post> {
        return this.http
            .put<Post>(`${API_URL}/post/${id}`, post, this.headers)
            .pipe(
                retry(3),
                catchError(this.handleError)
            );
    }

    // API: Get Comment
    getComment(id: number): Observable<Comment> {
        return this.http
            .get<Comment>(`${API_URL}/comment/${id}`)
            .pipe(
                retry(3),
                catchError(this.handleError)
            );
    }

    // API: Create Comment
    addComment(comment: Comment): Observable<Comment> {
        return this.http
            .post<Comment>(`${API_URL}/comment`, comment)
            .pipe(
                retry(3),
                catchError(this.handleError)
            );
    }

    // API: Delete Comment
    deleteComment(id: number) {
        this.http
            .delete(`${API_URL}/comment/${id}`, this.headers)
            .pipe(
                retry(3),
                catchError(this.handleError)
            );
    }

    // API: Update Comment
    updateComment(id: number, comment: Comment): Observable<Comment> {
        return this.http
            .put<Comment>(`${API_URL}/post/${id}`, comment, this.headers)
            .pipe(
                retry(3),
                catchError(this.handleError)
            );
    }

    // API: Get Notification
    getNotification(id: number): Observable<Notification> {
        return this.http
            .get<Notification>(`${API_URL}/notification/${id}`)
            .pipe(
                retry(3),
                catchError(this.handleError)
            );
    }

    // Error handling
    handleError(error: any) {
        let errorMessage: string;
        // Set error message
        (error.error instanceof ErrorEvent) ?
            errorMessage = error.error.message :
            errorMessage = `Error Code: ${error.code}\nMessage: ${error.message}`;
        console.log(errorMessage);
        return throwError(errorMessage);
    }
}
