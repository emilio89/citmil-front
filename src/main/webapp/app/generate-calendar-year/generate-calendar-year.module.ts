import { GENERATE_CALENDAR_YEAR_ROUTE } from "./generate-calendar-year.route"
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core"
import { RouterModule } from "@angular/router"

import { CitmilSharedModule } from "../shared/shared.module"
import { GenerateCalendarYearComponent } from "./generate-calendar-year.component"

@NgModule({
  imports: [CitmilSharedModule, RouterModule.forRoot([GENERATE_CALENDAR_YEAR_ROUTE], { useHash: true })],
  declarations: [GenerateCalendarYearComponent],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CitmilAppGenerateCalendarYearModule {}
