import { Component, Input, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Post } from '../../../_models/post';
import { Profile } from '../../../_models/profile';
import { Comment } from '../../../_models/comment';
import { BackendService } from '../../../_services/backend/backend.service';

declare const _: any;

export interface DialogData {
    comment: Comment;
    action: string;
}

@Component({
    selector: 'app-comment-dialog',
    templateUrl: 'comment-dialog.component.html',
})
export class CommentDialogComponent {
    // TODO: Include longpress for comments dialog on mobile

    constructor(
        public dialogRef: MatDialogRef<CommentDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    close(action?: string): void {
        this.dialogRef.close({
            action,
            comment: this.data.comment
        });
    }

}

@Component({
    selector: 'app-post-comments',
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.css'],
})
export class PostCommentsComponent implements OnInit {
    @Input() post: Post;
    @Input() user: Profile;
    @Input() preview = false;
    onHoldTimeout: any = null;

    constructor(
        private backend: BackendService,
        public dialog: MatDialog
    ) {}

    ngOnInit() {
        console.log(this.post);
    }

    startOnHold(comment: Comment) {
        this.onHoldTimeout = setTimeout(() => {
            console.log(
                'Held for popup',
                JSON.stringify(comment)
            );
            this.openDialog(comment);
            clearTimeout(this.onHoldTimeout);
            this.onHoldTimeout = null;
        }, 300);
    }

    endOnHold(comment: Comment) {
        if (this.onHoldTimeout) {
            console.log(
                'Closing before popup',
                JSON.stringify(comment)
            );
            clearTimeout(this.onHoldTimeout);
            this.onHoldTimeout = null;
        }
    }

    openDialog(comment: Comment): void {
        console.log(
            'Opening comment dialog',
            JSON.stringify(comment)
        );
        const dialogRef = this.dialog.open(CommentDialogComponent, {
            width: '90%',
            data: {
                comment,
                user: this.user
            }
        });

        dialogRef.afterClosed()
        .subscribe((result: string) => {
            console.log('The dialog was closed, result:', result);
            if (result) {
                this.checkCommentAction(result);
            }
        });
    }

    checkCommentAction(result: any) {
        switch (result.action) {
            case 'delete':
                // Remove comment
                this.removeComment(result.comment);
                return;

            case 'report':
                // TODO: Report comment
                return;
        }
    }

    removeComment(comment: Comment) {
        // remove comment on server
        this.backend.deleteComment(comment.id)
        .subscribe(() => {
            // Remove comment from post
            _.remove(this.post.comments, (c: any) => {
                return parseInt(c.id, 10) === comment.id;
            });
        }, (error: any) => {
            // Handle error
            console.warn(error);
        });
    }
}
