import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Profile } from 'src/app/_models/profile';
import { Post } from 'src/app/_models/post';

@Component({
  selector: 'app-profile-display',
  templateUrl: './profile-display.component.html',
  styleUrls: ['./profile-display.component.css']
})
export class ProfileDisplayComponent implements OnInit {
  @Input() profile: Profile;
  @Input() posts: Post[];
  @Input() isRequested: boolean;
  @Input() isMe: boolean;
  @Input() isFollowing: boolean;
  @Input() fetchedAllPosts: boolean;
  @Output() fetchMorePosts: EventEmitter<any> = new EventEmitter();
  @Output() followUser: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  doFetchMorePosts(): void {
    this.fetchMorePosts.emit();
  }

  doFollowUser(): void {
    this.followUser.emit();
  }

}
