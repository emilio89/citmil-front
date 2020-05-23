import { MatStepperModule } from "@angular/material/stepper"
import { MatAutocompleteModule } from "@angular/material/autocomplete"
import { A11yModule } from "@angular/cdk/a11y"
import { DragDropModule } from "@angular/cdk/drag-drop"
import { CdkStepperModule } from "@angular/cdk/stepper"
import { CdkTableModule } from "@angular/cdk/table"
import { CdkTreeModule } from "@angular/cdk/tree"
import { NgModule } from "@angular/core"

@NgModule({
  exports: [
    A11yModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatStepperModule
    /*  MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    ScrollingModule,*/
  ]
})
export class JhMaterialModule {}
