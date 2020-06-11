import { Route } from "@angular/router"

import { UserRouteAccessService } from "app/core/auth/user-route-access-service"
import { GenerateCalendarIndividualDaysComponent } from "./generate-calendar-individual-days.component"

export const GENERATE_CALENDAR_INDIVIDUALDAYS_ROUTE: Route = {
  path: "generate-calendar-individual-days",
  component: GenerateCalendarIndividualDaysComponent,
  data: {
    authorities: [],
    pageTitle: "generate-calendar-individual-days.title"
  },
  canActivate: [UserRouteAccessService]
}
