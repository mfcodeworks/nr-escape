import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Profile } from 'src/app/_models/profile';
import { UserService } from 'src/app/_services/user/user.service';

@Component({
    selector: 'app-profile-edit',
    templateUrl: './profile-edit.component.html',
    styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {
    // TODO: Submit info to update user

    processing = false;
    profile: Profile;
    profileForm = this.fb.group({
        username: ['', Validators.required],
        email: ['',
            [
                Validators.required,
                Validators.email
            ]
        ],
        bio: [''],
        contactInfo: this.fb.group({
            contactWebsite: [''],
            contactEmail: ['']
        })
    });

    constructor(
        private user: UserService,
        private fb: FormBuilder
    ) { }

    ngOnInit() {
        // Set profile data
        this.profile = this.user.profile;
        this.setFormData();
        console.log(this.profile);
    }

    setFormData(): void {
        console.warn(this.profileForm.controls);
        this.profileForm.patchValue({
            username: this.profile.username,
            email: this.profile.email,
            bio: this.profile.bio ? this.profile.bio : '',
            contactInfo: this.profile.contactInfo ? {
                contactWebsite: this.profile.contactInfo.website ? this.profile.contactInfo.website : '',
                contactEmail: this.profile.contactInfo.email ? this.profile.contactInfo.email : ''
            } : {}
        });
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
