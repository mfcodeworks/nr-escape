import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { Profile } from 'src/app/_models/profile';
import { UserService } from 'src/app/_services/user/user.service';
import { BackendService } from 'src/app/_services/backend/backend.service';
import { AuthService } from 'src/app/_services/auth/auth.service';

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
        private fb: FormBuilder,
        private backend: BackendService,
        private auth: AuthService,
        private location: Location
    ) { }

    ngOnInit() {
        // Set profile data
        this.profile = this.user.profile;
        this.setFormData();
        console.log(this.profile);
    }

    setFormData(): void {
        this.profileForm.patchValue({
            username: this.profile.username,
            email: this.profile.email,
            bio: this.profile.bio || '',
            contactInfo: this.profile.contactInfo ? {
                contactWebsite: this.profile.contactInfo.website || '',
                contactEmail: this.profile.contactInfo.email || ''
            } : {}
        });
    }

    onFileChange(input: any): void {
        if (!input.target.files[0]) {
            return;
        }

        // Create new formdata for profile media
        const form = new FormData();
        form.append('media', input.target.files[0]);
        console.log(form.get('media'));

        // DEBUG: Send new picture to server
        this.backend.updateUser(form)
        .subscribe(
            response => {
                this.auth.updateUser();
                console.log('Response', response);
                Object.assign(this.profile, response);
                this.processing = false;
            },
            err => {
                console.warn(err);
                this.processing = false;
            },
            () => this.processing = false
        );
    }

    updateProfile(): void {
        this.processing = true;
        console.log(this.profileForm.value);
        console.log('Updated:', Object.assign(this.profile, this.profileForm.value));

        // Update user model
        this.backend.updateUser(Object.assign(this.profile, this.profileForm.value))
        .subscribe(
            user => {
                this.auth.updateUser();
                this.location.back();
                this.processing = false;
            },
            err => {
                console.warn(err);
                this.processing = false;
            },
            () => this.processing = false
        );
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
