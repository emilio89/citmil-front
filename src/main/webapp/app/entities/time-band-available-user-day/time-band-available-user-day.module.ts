import { NgModule } from "@angular/core"
import { RouterModule } from "@angular/router"

import { CitmilSharedModule } from "app/shared/shared.module"
import { TimeBandAvailableUserDayComponent } from "./time-band-available-user-day.component"
import { TimeBandAvailableUserDayDetailComponent } from "./time-band-available-user-day-detail.component"
import { TimeBandAvailableUserDayUpdateComponent } from "./time-band-available-user-day-update.component"
import { TimeBandAvailableUserDayDeleteDialogComponent } from "./time-band-available-user-day-delete-dialog.component"
import { timeBandAvailableUserDayRoute } from "./time-band-available-user-day.route"

@NgModule({
  imports: [CitmilSharedModule, RouterModule.forChild(timeBandAvailableUserDayRoute)],
  declarations: [
    TimeBandAvailableUserDayComponent,
    TimeBandAvailableUserDayDetailComponent,
    TimeBandAvailableUserDayUpdateComponent,
    TimeBandAvailableUserDayDeleteDialogComponent
  ],
  entryComponents: [TimeBandAvailableUserDayDeleteDialogComponent]
})
export class CitmilTimeBandAvailableUserDayModule {}
