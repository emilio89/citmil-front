import { registerLocaleData } from "@angular/common"
import { MyDateAdapter } from "./provider/date-adapter"
import { NgModule, LOCALE_ID } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"

import "./vendor"
import { CitmilSharedModule } from "app/shared/shared.module"
import { CitmilCoreModule } from "app/core/core.module"
import { CitmilAppRoutingModule } from "./app-routing.module"
import { CitmilHomeModule } from "./home/home.module"
import { CitmilEntityModule } from "./entities/entity.module"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { FlexLayoutModule } from "@angular/flex-layout"
import "hammerjs"
import { CitmilAppGenerateCalendarMonthModule } from "./generate-calendar-month/generate-calendar-month.module"
import { CitmilAppGenerateCalendarIndividualDaysModule } from "./generate-calendar-individual-days/generate-calendar-individual-days.module"
import { CitmilAppGenerateCalendarYearModule } from "./generate-calendar-year/generate-calendar-year.module"
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from "./layouts/main/main.component"
import { NavbarComponent } from "./layouts/navbar/navbar.component"
import { FooterComponent } from "./layouts/footer/footer.component"
import { PageRibbonComponent } from "./layouts/profiles/page-ribbon.component"
import { ActiveMenuDirective } from "./layouts/navbar/active-menu.directive"
import { ErrorComponent } from "./layouts/error/error.component"
import { CalendarModule } from "./entities/calendar/calendar.module"
import { FullCalendarModule } from "@fullcalendar/angular"
import { ModelEditWorkingDayModule } from "./entities/calendar/model-edit-working-day/model-edit-working-day.module"
import { NgxMatSelectSearchModule } from "ngx-mat-select-search"
import { NgxMaterialTimepickerModule } from "ngx-material-timepicker"
import { DateAdapter, MAT_DATE_LOCALE } from "@angular/material/core"
import { NgxSpinnerModule } from "ngx-spinner"
import localeES from "@angular/common/locales/es-419"

registerLocaleData(localeES, "es-419")
@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    CitmilSharedModule,
    CitmilCoreModule,
    CitmilHomeModule,
    CitmilAppGenerateCalendarMonthModule,
    CitmilAppGenerateCalendarIndividualDaysModule,
    CitmilAppGenerateCalendarYearModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    CitmilEntityModule,
    CitmilAppRoutingModule,
    CalendarModule,
    FullCalendarModule,
    ModelEditWorkingDayModule,
    NgxMatSelectSearchModule,
    NgxMaterialTimepickerModule,
    NgxSpinnerModule
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, ActiveMenuDirective, FooterComponent],
  bootstrap: [MainComponent],
  providers: [
    { provide: DateAdapter, useClass: MyDateAdapter },
    { provide: LOCALE_ID, useValue: "es-419" },
    { provide: MAT_DATE_LOCALE, useValue: "es-ES" }
  ]
})
export class CitmilAppModule {}
