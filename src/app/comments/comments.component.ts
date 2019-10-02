import { Component, Input, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Post } from '../_models/post';

export interface DialogData {
    comment: Comment;
    action: string;
}

@Component({
    selector: 'app-comment-dialog',
    templateUrl: 'comment-dialog.component.html',
})
export class CommentDialogComponent {

    constructor(
        public dialogRef: MatDialogRef<CommentDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {}

    close(action?: string): void {
        this.dialogRef.close(action);
    }

}

@Component({
    selector: 'app-comments',
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.css'],
})
export class CommentsComponent implements OnInit {
    @Input() post: Post;
    @Input() preview = false;
    onHoldTimeout: any = null;
    commentAction: string;

    constructor(public dialog: MatDialog) {}

    ngOnInit() {}

    startOnHold(comment: Comment) {
        this.onHoldTimeout = setTimeout(() => {
            console.log('Held for popup', comment);
            this.openDialog(comment);
            clearTimeout(this.onHoldTimeout);
            this.onHoldTimeout = null;
        }, 600);
    }

    endOnHold(comment: Comment) {
        if (this.onHoldTimeout) {
            console.log('Closing before popup', comment);
            clearTimeout(this.onHoldTimeout);
            this.onHoldTimeout = null;
        }
    }

    openDialog(comment: Comment): void {
        const dialogRef = this.dialog.open(CommentDialogComponent, {
            width: '90%',
            data: { comment }
        });

        dialogRef.afterClosed()
        .subscribe((result: string) => {
            console.log('The dialog was closed, result:', result);
            this.commentAction = result;
        });
  }
}
