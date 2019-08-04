import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
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
import { LoginComponent } from './login/login.component';
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
                }
            },
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'signup',
                component: SignUpComponent
            },
            {
                path: 'search',
                component: SearchComponent
            },
            {
                path: 'new-post',
                component: NewPostComponent
            },
            {
                path: 'post/:postId',
                component: PostComponent,
                resolve: {
                    post: PostResolver
                }
            },
            {
                path: 'notifications',
                component: NotificationsComponent
            },
            {
                path: 'profile/:profileId',
                component: ProfileComponent,
                resolve: {
                    profile: ProfileResolver
                }
            },
            {
                path: 'settings',
                component: SettingsComponent
            },
            {
                path: 'sign-in',
                component: SignInComponent
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
        LoginComponent,
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
