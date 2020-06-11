import { NgxMaterialTimepickerModule } from "ngx-material-timepicker"
import { GENERATE_CALENDAR_INDIVIDUALDAYS_ROUTE } from "./generate-calendar-individual-days.route"
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core"
import { RouterModule } from "@angular/router"

import { CitmilSharedModule } from "../shared/shared.module"
import { GenerateCalendarIndividualDaysComponent } from "./generate-calendar-individual-days.component"
import { NgxMatSelectSearchModule } from "ngx-mat-select-search"
import { JhMaterialModule } from "app/shared/jh-material.module"
import { ReactiveFormsModule } from "@angular/forms"

@NgModule({
  imports: [
    CitmilSharedModule,
    RouterModule.forRoot([GENERATE_CALENDAR_INDIVIDUALDAYS_ROUTE], { useHash: true }),
    NgxMatSelectSearchModule,
    JhMaterialModule,
    NgxMaterialTimepickerModule,
    ReactiveFormsModule
  ],
  declarations: [GenerateCalendarIndividualDaysComponent],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CitmilAppGenerateCalendarIndividualDaysModule {}
