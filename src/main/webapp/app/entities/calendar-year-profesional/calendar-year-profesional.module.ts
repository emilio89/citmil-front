import { NgModule } from "@angular/core"
import { RouterModule } from "@angular/router"

import { CitmilSharedModule } from "app/shared/shared.module"
import { CalendarYearProfesionalComponent } from "./calendar-year-profesional.component"
import { CalendarYearProfesionalDetailComponent } from "./calendar-year-profesional-detail.component"
import { CalendarYearProfesionalUpdateComponent } from "./calendar-year-profesional-update.component"
import { CalendarYearProfesionalDeleteDialogComponent } from "./calendar-year-profesional-delete-dialog.component"
import { calendarYearProfesionalRoute } from "./calendar-year-profesional.route"

@NgModule({
  imports: [CitmilSharedModule, RouterModule.forChild(calendarYearProfesionalRoute)],
  declarations: [CalendarYearProfesionalComponent, CalendarYearProfesionalDetailComponent, CalendarYearProfesionalUpdateComponent, CalendarYearProfesionalDeleteDialogComponent],
  entryComponents: [CalendarYearProfesionalDeleteDialogComponent]
})
export class CitmilCalendarYearProfesionalModule {}
