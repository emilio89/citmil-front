import { NgModule } from "@angular/core"
import { RouterModule } from "@angular/router"

import { CitmilSharedModule } from "app/shared/shared.module"
import { AppointmentComponent } from "./appointment.component"
import { AppointmentDetailComponent } from "./appointment-detail.component"
import { AppointmentUpdateComponent } from "./appointment-update.component"
import { AppointmentDeleteDialogComponent } from "./appointment-delete-dialog.component"
import { appointmentRoute } from "./appointment.route"

@NgModule({
  imports: [CitmilSharedModule, RouterModule.forChild(appointmentRoute)],
  declarations: [AppointmentComponent, AppointmentDetailComponent, AppointmentUpdateComponent, AppointmentDeleteDialogComponent],
  entryComponents: [AppointmentDeleteDialogComponent]
})
export class CitmilAppointmentModule {}