import { NgModule } from "@angular/core"
import { RouterModule } from "@angular/router"

import { CitmilSharedModule } from "app/shared/shared.module"
import { PublicHolidayComponent } from "./public-holiday.component"
import { PublicHolidayDetailComponent } from "./public-holiday-detail.component"
import { PublicHolidayUpdateComponent } from "./public-holiday-update.component"
import { PublicHolidayDeleteDialogComponent } from "./public-holiday-delete-dialog.component"
import { publicHolidayRoute } from "./public-holiday.route"

@NgModule({
  imports: [CitmilSharedModule, RouterModule.forChild(publicHolidayRoute)],
  declarations: [PublicHolidayComponent, PublicHolidayDetailComponent, PublicHolidayUpdateComponent, PublicHolidayDeleteDialogComponent],
  entryComponents: [PublicHolidayDeleteDialogComponent]
})
export class CitmilPublicHolidayModule {}
