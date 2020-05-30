import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog"
import { CalendarComponent } from "../calendar.component"
import { Inject, Component } from "@angular/core"

@Component({
  selector: "jhi-model-edit-working-day.component",
  templateUrl: "model-edit-working-day.component.html"
})
export class ModelEditWorkingDayComponent {
  constructor(public dialogRef: MatDialogRef<CalendarComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close()
  }
}
