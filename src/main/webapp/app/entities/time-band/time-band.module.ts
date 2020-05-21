import { NgModule } from "@angular/core"
import { RouterModule } from "@angular/router"

import { CitmilSharedModule } from "app/shared/shared.module"
import { TimeBandComponent } from "./time-band.component"
import { TimeBandDetailComponent } from "./time-band-detail.component"
import { TimeBandUpdateComponent } from "./time-band-update.component"
import { TimeBandDeleteDialogComponent } from "./time-band-delete-dialog.component"
import { timeBandRoute } from "./time-band.route"

@NgModule({
  imports: [CitmilSharedModule, RouterModule.forChild(timeBandRoute)],
  declarations: [TimeBandComponent, TimeBandDetailComponent, TimeBandUpdateComponent, TimeBandDeleteDialogComponent],
  entryComponents: [TimeBandDeleteDialogComponent]
})
export class CitmilTimeBandModule {}
