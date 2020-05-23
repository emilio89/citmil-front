import { Injectable } from "@angular/core"
import { JhiResolvePagingParams } from "ng-jhipster"

import { Authority } from "app/shared/constants/authority.constants"
import { UserRouteAccessService } from "app/core/auth/user-route-access-service"
import { CalendarService } from "./calendar.service"
import { CalendarComponent } from "./calendar.component"
import { Router, Routes } from "@angular/router"

@Injectable({ providedIn: "root" })
export class CalendarResolve {
  constructor(private service: CalendarService, private router: Router) {}
}
export const calendarRoute: Routes = [
  {
    path: "",
    component: CalendarComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: [Authority.USER],
      defaultSort: "id,asc",
      pageTitle: "citmilApp.calendar.title"
    },
    canActivate: [UserRouteAccessService]
  }
]
