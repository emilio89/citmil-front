import { Route } from "@angular/router"

import { UserRouteAccessService } from "app/core/auth/user-route-access-service"
import { GenerateCalendarWeekComponent } from "./generate-calendar-week.component"

export const GENERATE_CALENDAR_WEEK_ROUTE: Route = {
  path: "generate-calendar-week",
  component: GenerateCalendarWeekComponent,
  data: {
    authorities: [],
    pageTitle: "generate-calendar-week.title"
  },
  canActivate: [UserRouteAccessService]
}
