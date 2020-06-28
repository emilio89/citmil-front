import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core"
import { RouterModule } from "@angular/router"

import { CitmilSharedModule } from "../shared/shared.module"

import { CREATE_APPOINTMENT_ROUTE, CreateAppointmentComponent } from "./"
import { JhMaterialModule } from "app/shared/jh-material.module"

@NgModule({
  imports: [CitmilSharedModule, RouterModule.forRoot([CREATE_APPOINTMENT_ROUTE], { useHash: true }), JhMaterialModule],
  declarations: [CreateAppointmentComponent],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CitmilAppCreateAppointmentModule {}
