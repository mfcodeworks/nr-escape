import { Component, OnInit } from '@angular/core';

import { UserService } from '../_services/user/user.service';

@Component({
    selector: 'app-bottom-bar',
    templateUrl: './bottom-bar.component.html',
    styleUrls: ['./bottom-bar.component.css'],
})
export class BottomBarComponent implements OnInit {
    userId: number;

    constructor(private userService: UserService) {}

    ngOnInit() {
        this.userId = this.userService.profile.id;
    }
}
