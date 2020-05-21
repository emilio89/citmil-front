import { NgModule } from "@angular/core"
import { RouterModule } from "@angular/router"

import { CitmilSharedModule } from "app/shared/shared.module"
import { CalendarYearUserComponent } from "./calendar-year-user.component"
import { CalendarYearUserDetailComponent } from "./calendar-year-user-detail.component"
import { CalendarYearUserUpdateComponent } from "./calendar-year-user-update.component"
import { CalendarYearUserDeleteDialogComponent } from "./calendar-year-user-delete-dialog.component"
import { calendarYearUserRoute } from "./calendar-year-user.route"

@NgModule({
  imports: [CitmilSharedModule, RouterModule.forChild(calendarYearUserRoute)],
  declarations: [CalendarYearUserComponent, CalendarYearUserDetailComponent, CalendarYearUserUpdateComponent, CalendarYearUserDeleteDialogComponent],
  entryComponents: [CalendarYearUserDeleteDialogComponent]
})
export class CitmilCalendarYearUserModule {}
