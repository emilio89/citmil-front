import { NgModule } from "@angular/core"
import { RouterModule } from "@angular/router"

import { CitmilSharedModule } from "app/shared/shared.module"
import { TimeBandAvailableProfesionalDayComponent } from "./time-band-available-profesional-day.component"
import { TimeBandAvailableProfesionalDayDetailComponent } from "./time-band-available-profesional-day-detail.component"
import { TimeBandAvailableProfesionalDayUpdateComponent } from "./time-band-available-profesional-day-update.component"
import { TimeBandAvailableProfesionalDayDeleteDialogComponent } from "./time-band-available-profesional-day-delete-dialog.component"
import { timeBandAvailableProfesionalDayRoute } from "./time-band-available-profesional-day.route"

@NgModule({
  imports: [CitmilSharedModule, RouterModule.forChild(timeBandAvailableProfesionalDayRoute)],
  declarations: [
    TimeBandAvailableProfesionalDayComponent,
    TimeBandAvailableProfesionalDayDetailComponent,
    TimeBandAvailableProfesionalDayUpdateComponent,
    TimeBandAvailableProfesionalDayDeleteDialogComponent
  ],
  entryComponents: [TimeBandAvailableProfesionalDayDeleteDialogComponent]
})
export class CitmilTimeBandAvailableProfesionalDayModule {}
