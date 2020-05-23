import { Route } from "@angular/router"

import { UserRouteAccessService } from "app/core/auth/user-route-access-service"
import { GenerateCalendarMonthComponent } from "./generate-calendar-month.component"

export const GENERATE_CALENDAR_MONTH_ROUTE: Route = {
  path: "generate-calendar-month",
  component: GenerateCalendarMonthComponent,
  data: {
    authorities: [],
    pageTitle: "generate-calendar-month.title"
  },
  canActivate: [UserRouteAccessService]
}
