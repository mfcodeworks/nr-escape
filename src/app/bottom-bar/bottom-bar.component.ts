import { Component, OnInit } from '@angular/core';

import { UserService } from '../user/user.service';
import { User } from '../user';

@Component({
    selector: 'app-bottom-bar',
    templateUrl: './bottom-bar.component.html',
    styleUrls: ['./bottom-bar.component.css'],
})
export class BottomBarComponent implements OnInit {
    user: User;

    constructor(private userService: UserService) {
    }

    ngOnInit() {
        this.user = this.userService.user;
    }
}
