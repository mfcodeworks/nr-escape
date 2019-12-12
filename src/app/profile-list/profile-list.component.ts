import { Component, OnInit, Inject } from '@angular/core';
import { Profile } from '../_models/profile';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { BackendService } from '../_services/backend/backend.service';

export interface DialogData {
    action: string;
    profile: Profile;
}

@Component({
    selector: 'app-blocked-dialog',
    templateUrl: 'blocked-dialog.component.html',
})
export class BlockedDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<BlockedDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    close(action?: string): void {
        this.dialogRef.close({
            action,
            profile: this.data.profile
        });
    }
}

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
        private router: Router,
        private backend: BackendService,
        public dialog: MatDialog
    ) { }

    ngOnInit() {
        this.route.data.subscribe((data: any) => {
            this.profiles = data.profiles;
        });
        this.type = this.router.url.split('/').pop();
    }


    openDialog(profile: Profile): void {
        console.log(
            'Opening profile dialog',
            profile
        );
        const dialogRef = this.dialog.open(BlockedDialogComponent, {
            width: '90%',
            data: { profile }
        });

        dialogRef.afterClosed()
        .subscribe((result: string) => {
            console.log('The dialog was closed, result:', result);
            if (result) {
                this.checkDialogAction(result);
            }
        });
    }

    checkDialogAction(result: any) {
        switch (result.action) {
            case 'unblock':
                // Block profile
                this.backend.unblockUser(result.profile.id).subscribe(
                    () => this.profiles = this.profiles.filter(p => p.id !== result.profile.id),
                    () => console.warn
                )
                return;

            default:
                return;
        }
    }
}
