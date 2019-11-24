import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { OverlayModule } from '@angular/cdk/overlay';
import { MentionModule } from 'angular-mentions';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { Routing } from './main.routing';
import { MaterialModule } from './_modules/material/material.module';
import { SignedInGuard } from './_helpers/signed-in.guard';
import { FeedResolver } from './_helpers/feed.resolver';
import { RecommendationsResolver } from './_helpers/recommendations.resolver';
import { NotificationsResolver } from './_helpers/notifications.resolver';
import { HashtagResolver } from './_helpers/hashtag.resolver';
import { ProfileResolver } from './_helpers/profile.resolver';
import { PostResolver } from './_helpers/post.resolver';
import { NewPostResolver } from './_helpers/new-post.resolver';
import { TopBarComponent } from './top-bar/top-bar.component';
import { BottomBarComponent } from './bottom-bar/bottom-bar.component';
import { PostDisplayComponent } from './post/post-view/post-display/post-display.component';
import { PostPreviewGridComponent } from './post-preview-grid/post-preview-grid.component';
import { PostInteractionBarComponent } from './post/post-view/post-interaction-bar/post-interaction-bar.component';
import { PostCommentsComponent, CommentDialogComponent } from './post/post-view/comments/comments.component';
import { FeedComponent } from './feed/feed.component';
import { NewPostComponent, PostBottomSheetComponent } from './new-post/new-post.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { PostComponent } from './post/post.component';
import { PostViewComponent } from './post/post-view/post-view.component';
import { ProfileComponent } from './profile/profile.component';
import { RecommendationsComponent } from './recommendations/recommendations.component';
import { SettingsComponent } from './settings/settings.component';
import { DateDiffPipe } from './_helpers/date-diff.pipe';
import { SearchComponent } from './search/search.component';
import { HashtagListingComponent } from './hashtag-listing/hashtag-listing.component';
import { RouteTransformerDirective } from './_helpers/route-transformer.directive';
import { TagPipe } from './_helpers/tag.pipe';
import { PostLikesComponent } from './post/post-view/post-likes/post-likes.component';
import { ProfileDisplayComponent } from './profile//profile-display/profile-display.component';
import { ProfileEditComponent } from './profile/profile-edit/profile-edit.component';
import { LongholdDirective } from './_helpers/longhold.directive';

@NgModule({
    imports: [
        MaterialModule,
        CommonModule,
        InfiniteScrollModule,
        MentionModule,
        OverlayModule,
        HttpClientModule,
        ReactiveFormsModule,
        Routing
    ],
    declarations: [
        TopBarComponent,
        BottomBarComponent,
        PostDisplayComponent,
        PostPreviewGridComponent,
        PostInteractionBarComponent,
        CommentDialogComponent,
        PostCommentsComponent,
        FeedComponent,
        PostBottomSheetComponent,
        NewPostComponent,
        NotificationsComponent,
        PostComponent,
        ProfileComponent,
        RecommendationsComponent,
        SettingsComponent,
        DateDiffPipe,
        SearchComponent,
        PostViewComponent,
        HashtagListingComponent,
        RouteTransformerDirective,
        TagPipe,
        PostLikesComponent,
        ProfileDisplayComponent,
        ProfileEditComponent,
        LongholdDirective
    ],
    entryComponents: [
        CommentDialogComponent,
        PostBottomSheetComponent
    ],
    providers: [
        SignedInGuard,
        FeedResolver,
        RecommendationsResolver,
        NotificationsResolver,
        ProfileResolver,
        PostResolver,
        HashtagResolver,
        NewPostResolver
    ],
    exports: [
        TopBarComponent,
        BottomBarComponent,
        PostDisplayComponent,
        PostPreviewGridComponent,
        PostInteractionBarComponent,
        CommentDialogComponent,
        PostCommentsComponent,
        FeedComponent,
        PostBottomSheetComponent,
        NewPostComponent,
        NotificationsComponent,
        PostComponent,
        ProfileComponent,
        RecommendationsComponent,
        SettingsComponent,
        DateDiffPipe,
        SearchComponent,
        PostViewComponent,
        HashtagListingComponent,
        RouteTransformerDirective,
        TagPipe,
        PostLikesComponent,
        ProfileDisplayComponent,
        ProfileEditComponent
    ]
})
export class MainModule { }
