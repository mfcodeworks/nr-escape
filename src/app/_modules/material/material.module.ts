import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        MatTooltipModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatCheckboxModule,
        MatListModule,
        MatIconModule,
        MatGridListModule,
        MatToolbarModule,
        MatTabsModule,
        MatInputModule,
        MatSnackBarModule,
        MatFormFieldModule,
        MatProgressBarModule,
        MatStepperModule,
        MatSelectModule,
        MatCardModule,
        MatDialogModule,
        MatMenuModule,
        MatBottomSheetModule,
        MatSidenavModule,
        MatExpansionModule,
        MatSlideToggleModule,
    ],
    providers: [
        MatSnackBar
    ],
    exports: [
        MatTooltipModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatCheckboxModule,
        MatListModule,
        MatIconModule,
        MatGridListModule,
        MatToolbarModule,
        MatTabsModule,
        MatInputModule,
        MatSnackBarModule,
        MatFormFieldModule,
        MatProgressBarModule,
        MatStepperModule,
        MatSelectModule,
        MatCardModule,
        MatDialogModule,
        MatMenuModule,
        MatBottomSheetModule,
        MatSidenavModule,
        MatExpansionModule,
        MatSlideToggleModule
    ]
})
export class MaterialModule { }
