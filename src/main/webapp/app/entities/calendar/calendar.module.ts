import { MatInputModule } from "@angular/material/input"
import { MatStepperModule } from "@angular/material/stepper"
import { calendarRoute } from "./calendar.route"
import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"

import { CalendarComponent } from "./calendar.component"
import { RouterModule } from "@angular/router"
import { FullCalendarModule } from "@fullcalendar/angular"
import { MatFormFieldModule } from "@angular/material/form-field"
import { ReactiveFormsModule } from "@angular/forms"
import { MatButtonModule } from "@angular/material/button"

@NgModule({
  declarations: [CalendarComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(calendarRoute),
    FullCalendarModule,
    MatStepperModule,
    MatFormFieldModule,
    MatStepperModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class CalendarModule {}
