import { Component, OnInit, Input } from '@angular/core';
import { BackendService } from '../_services/backend/backend.service';
import { Profile } from '../_models/profile';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.css']
})
export class ProfileListComponent implements OnInit {
    profiles: Profile[];
    type: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        this.route.data.subscribe((data: any) => {
            this.profiles = data.profiles;
        });
        this.type = this.router.url.split('/').pop();
    }

}
