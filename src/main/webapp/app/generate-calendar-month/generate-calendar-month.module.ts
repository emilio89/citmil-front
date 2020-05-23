import { GENERATE_CALENDAR_MONTH_ROUTE } from "./generate-calendar-month.route"
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core"
import { RouterModule } from "@angular/router"

import { CitmilSharedModule } from "../shared/shared.module"
import { GenerateCalendarMonthComponent } from "./generate-calendar-month.component"
import { JhMaterialModule } from "app/shared/jh-material.module"

@NgModule({
  imports: [CitmilSharedModule, JhMaterialModule, RouterModule.forRoot([GENERATE_CALENDAR_MONTH_ROUTE], { useHash: true })],
  declarations: [GenerateCalendarMonthComponent],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CitmilAppGenerateCalendarMonthModule {}
