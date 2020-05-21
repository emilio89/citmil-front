import { NgModule } from "@angular/core"
import { RouterModule } from "@angular/router"

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: "profesional",
        loadChildren: () => import("./profesional/profesional.module").then(m => m.CitmilProfesionalModule)
      },
      {
        path: "company",
        loadChildren: () => import("./company/company.module").then(m => m.CitmilCompanyModule)
      },
      {
        path: "menu-options-available",
        loadChildren: () => import("./menu-options-available/menu-options-available.module").then(m => m.CitmilMenuOptionsAvailableModule)
      },
      {
        path: "dynamic-content",
        loadChildren: () => import("./dynamic-content/dynamic-content.module").then(m => m.CitmilDynamicContentModule)
      },
      {
        path: "type-service",
        loadChildren: () => import("./type-service/type-service.module").then(m => m.CitmilTypeServiceModule)
      },
      {
        path: "time-band",
        loadChildren: () => import("./time-band/time-band.module").then(m => m.CitmilTimeBandModule)
      },
      {
        path: "appointment",
        loadChildren: () => import("./appointment/appointment.module").then(m => m.CitmilAppointmentModule)
      },
      {
        path: "calendar-year-profesional",
        loadChildren: () => import("./calendar-year-profesional/calendar-year-profesional.module").then(m => m.CitmilCalendarYearProfesionalModule)
      },
      {
        path: "time-band-available-profesional-day",
        loadChildren: () => import("./time-band-available-profesional-day/time-band-available-profesional-day.module").then(m => m.CitmilTimeBandAvailableProfesionalDayModule)
      },
      {
        path: "public-holiday",
        loadChildren: () => import("./public-holiday/public-holiday.module").then(m => m.CitmilPublicHolidayModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class CitmilEntityModule {}
