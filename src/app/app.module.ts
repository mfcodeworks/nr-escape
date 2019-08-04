import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';

import { SignedInGuard } from './signed-in.guard';
import { BackendService } from './backend/backend.service';
import { ApiService } from './api/api.service';
import { UserService } from './user/user.service';
import { AuthService } from './auth/auth.service';
import { FeedResolver } from './feed/feed.resolver';
import { ProfileResolver } from './profile/profile.resolver';
import { PostResolver } from './post/post.resolver';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { BottomBarComponent } from './bottom-bar/bottom-bar.component';
import { PostDisplayComponent } from './post-display/post-display.component';
import { PostInteractionBarComponent } from './post-interaction-bar/post-interaction-bar.component';
import { CommentPreviewComponent } from './comment-preview/comment-preview.component';
import { FeedComponent } from './feed/feed.component';
import { NewPostComponent } from './new-post/new-post.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { PostComponent } from './post/post.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';
import { SettingsComponent } from './settings/settings.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatListModule,
        MatIconModule,
        MatGridListModule,
        MatToolbarModule,
        MatInputModule,
        MatFormFieldModule,
        RouterModule.forRoot([
            {
                path: '',
                component: FeedComponent,
                resolve: {
                    posts: FeedResolver
                },
                canActivate: [
                    SignedInGuard
                ]
            },
            {
                path: 'search',
                component: SearchComponent,
                canActivate: [
                    SignedInGuard
                ]
            },
            {
                path: 'new-post',
                component: NewPostComponent,
                canActivate: [
                    SignedInGuard
                ]
            },
            {
                path: 'post/:postId',
                component: PostComponent,
                resolve: {
                    post: PostResolver
                },
                canActivate: [
                    SignedInGuard
                ]
            },
            {
                path: 'notifications',
                component: NotificationsComponent,
                canActivate: [
                    SignedInGuard
                ]
            },
            {
                path: 'profile/:profileId',
                component: ProfileComponent,
                resolve: {
                    profile: ProfileResolver
                },
                canActivate: [
                    SignedInGuard
                ]
            },
            {
                path: 'settings',
                component: SettingsComponent,
                canActivate: [
                    SignedInGuard
                ]
            },
            {
                path: 'sign-in',
                component: SignInComponent
            },
            {
                path: 'sign-up',
                component: SignUpComponent
            },
            {
                path: 'login',
                redirectTo: '/sign-in',
                pathMatch: 'full'
            }
        ]),
    ],
    declarations: [
        AppComponent,
        TopBarComponent,
        BottomBarComponent,
        PostDisplayComponent,
        PostInteractionBarComponent,
        CommentPreviewComponent,
        FeedComponent,
        NewPostComponent,
        NotificationsComponent,
        PostComponent,
        ProfileComponent,
        SearchComponent,
        SettingsComponent,
        SignUpComponent,
        SignInComponent
    ],
    providers: [
        SignedInGuard,
        BackendService,
        ApiService,
        AuthService,
        UserService,
        FeedResolver,
        ProfileResolver,
        PostResolver
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
