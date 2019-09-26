import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayModule } from '@angular/cdk/overlay';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatSnackBar,
    MatProgressBarModule,
    MatFormFieldModule,
    MatGridListModule,
    MatSnackBarModule,
    MatSelectModule,
    MatStepperModule,
    MatCardModule,
    MatBottomSheetModule
} from '@angular/material';
import { environment } from '../environments/environment';

import { Routing } from './app.routing';
import { SignedInGuard } from './_helpers/signed-in.guard';
import { FeedResolver } from './_helpers/feed.resolver';
import { RecommendationsResolver } from './_helpers/recommendations.resolver';
import { NotificationsResolver } from './_helpers/notifications.resolver';
import { ProfileResolver } from './_helpers/profile.resolver';
import { PostResolver } from './_helpers/post.resolver';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { BottomBarComponent } from './bottom-bar/bottom-bar.component';
import { PostDisplayComponent } from './post-display/post-display.component';
import { PostPreviewGridComponent } from './post-preview-grid/post-preview-grid.component';
import { PostInteractionBarComponent } from './post-interaction-bar/post-interaction-bar.component';
import { CommentPreviewComponent } from './comment-preview/comment-preview.component';
import { FeedComponent } from './feed/feed.component';
import { NewPostComponent, PostBottomSheetComponent } from './new-post/new-post.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { PostComponent } from './post/post.component';
import { ProfileComponent } from './profile/profile.component';
import { RecommendationsComponent } from './recommendations/recommendations.component';
import { SettingsComponent } from './settings/settings.component';
import {
    AuthenticationModule
} from './_modules/authentication/authentication.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { DateDiffPipe } from './_helpers/date-diff.pipe';
import { SearchComponent } from './search/search.component';

@NgModule({
    imports: [
        AuthenticationModule,
        OverlayModule,
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
        MatSnackBarModule,
        MatFormFieldModule,
        MatProgressBarModule,
        MatStepperModule,
        MatSelectModule,
        MatCardModule,
        MatBottomSheetModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireMessagingModule,
        Routing,
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: true }),
    ],
    declarations: [
        AppComponent,
        TopBarComponent,
        BottomBarComponent,
        PostDisplayComponent,
        PostPreviewGridComponent,
        PostInteractionBarComponent,
        CommentPreviewComponent,
        FeedComponent,
        PostBottomSheetComponent,
        NewPostComponent,
        NotificationsComponent,
        PostComponent,
        ProfileComponent,
        RecommendationsComponent,
        SettingsComponent,
        DateDiffPipe,
        SearchComponent
    ],
    entryComponents: [
        PostBottomSheetComponent
    ],
    providers: [
        MatSnackBar,
        SignedInGuard,
        FeedResolver,
        RecommendationsResolver,
        NotificationsResolver,
        ProfileResolver,
        PostResolver,
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
