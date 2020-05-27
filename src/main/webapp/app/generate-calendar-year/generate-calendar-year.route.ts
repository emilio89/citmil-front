import { Route } from "@angular/router"

import { UserRouteAccessService } from "app/core/auth/user-route-access-service"
import { GenerateCalendarYearComponent } from "./generate-calendar-year.component"

export const GENERATE_CALENDAR_YEAR_ROUTE: Route = {
  path: "generate-calendar-year",
  component: GenerateCalendarYearComponent,
  data: {
    authorities: [],
    pageTitle: "generate-calendar-year.title"
  },
  canActivate: [UserRouteAccessService]
}
