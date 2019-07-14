import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatListModule, MatToolbarModule, MatIconModule } from '@angular/material';

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

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatListModule,
        MatIconModule,
        ReactiveFormsModule,
        MatToolbarModule,
        RouterModule.forRoot([
            { path: '', component: FeedComponent },
            { path: 'login', component: LoginComponent },
            { path: 'signup', component: SignUpComponent },
            { path: 'search', component: SearchComponent },
            { path: 'new-post', component: NewPostComponent },
            { path: 'post/:postId', component: PostComponent },
            { path: 'notifications', component: NotificationsComponent },
            { path: 'profile/:profileId', component: ProfileComponent },
            { path: 'settings', component: SettingsComponent },
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
        SignUpComponent
    ],
    providers: [],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
