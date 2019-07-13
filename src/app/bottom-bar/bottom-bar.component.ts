import { Component, OnInit } from '@angular/core';

import { user } from '../test-data/user';

@Component({
    selector: 'app-bottom-bar',
    templateUrl: './bottom-bar.component.html',
    styleUrls: ['./bottom-bar.component.css'],
})
export class BottomBarComponent implements OnInit {
    user = user;

    constructor() { }

    ngOnInit() { }
}
