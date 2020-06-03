import { NgxMaterialTimepickerModule } from "ngx-material-timepicker"
import { GENERATE_CALENDAR_WEEK_ROUTE } from "./generate-calendar-week.route"
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core"
import { RouterModule } from "@angular/router"

import { CitmilSharedModule } from "../shared/shared.module"
import { GenerateCalendarWeekComponent } from "./generate-calendar-week.component"
import { NgxMatSelectSearchModule } from "ngx-mat-select-search"
import { JhMaterialModule } from "app/shared/jh-material.module"
import { ReactiveFormsModule } from "@angular/forms"

@NgModule({
  imports: [
    CitmilSharedModule,
    RouterModule.forRoot([GENERATE_CALENDAR_WEEK_ROUTE], { useHash: true }),
    NgxMatSelectSearchModule,
    JhMaterialModule,
    NgxMaterialTimepickerModule,
    ReactiveFormsModule
  ],
  declarations: [GenerateCalendarWeekComponent],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CitmilAppGenerateCalendarWeekModule {}
