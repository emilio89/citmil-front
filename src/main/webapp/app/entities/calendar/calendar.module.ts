import { calendarRoute } from "./calendar.route"
import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"

import { CalendarComponent } from "./calendar.component"
import { RouterModule } from "@angular/router"
import { FullCalendarModule } from "@fullcalendar/angular"
import { ReactiveFormsModule } from "@angular/forms"
import { JhMaterialModule } from "app/shared/jh-material.module"

@NgModule({
  declarations: [CalendarComponent],
  imports: [ReactiveFormsModule, CommonModule, RouterModule.forChild(calendarRoute), FullCalendarModule, JhMaterialModule]
})
export class CalendarModule {}
