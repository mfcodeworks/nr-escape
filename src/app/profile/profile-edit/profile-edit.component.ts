import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Profile } from 'src/app/_models/profile';

@Component({
    selector: 'app-profile-edit',
    templateUrl: './profile-edit.component.html',
    styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {
    profile: Profile;
    profileForm = this.fb.group({
        username: [this.profile.username, Validators.required],
        email: [this.profile.email,
            [
                Validators.required,
                Validators.email
            ]
        ],
    });

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder
    ) { }

    ngOnInit() {
        // Set profile data
        this.route.data.subscribe((data) => {
            if (data.profile instanceof Object) {
                this.profile = data.profile;
            } else {
                // Handle error
                console.warn(data);
            }
        });
        console.log(this.profile);
    }

    getErrors(control: string): string {
        switch (true) {
            case this.profileForm.get(control).hasError('required'):
                return `${this.prettyCapitalize(control.replace(/[0-9]/g, ''))} is required`;

            case this.profileForm.get(control).hasError('email'):
                    return `${this.prettyCapitalize(control)} is not an email`;
        }
    }

    prettyCapitalize(text: string): string {
        return text[0].toUpperCase() + text.substring(1);
    }

}
