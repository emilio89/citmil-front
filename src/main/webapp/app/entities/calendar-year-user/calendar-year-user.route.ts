import { Injectable } from "@angular/core"
import { HttpResponse } from "@angular/common/http"
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from "@angular/router"
import { Observable, of, EMPTY } from "rxjs"
import { flatMap } from "rxjs/operators"

import { Authority } from "app/shared/constants/authority.constants"
import { UserRouteAccessService } from "app/core/auth/user-route-access-service"
import { ICalendarYearUser, CalendarYearUser } from "app/shared/model/calendar-year-user.model"
import { CalendarYearUserService } from "./calendar-year-user.service"
import { CalendarYearUserComponent } from "./calendar-year-user.component"
import { CalendarYearUserDetailComponent } from "./calendar-year-user-detail.component"
import { CalendarYearUserUpdateComponent } from "./calendar-year-user-update.component"

@Injectable({ providedIn: "root" })
export class CalendarYearUserResolve implements Resolve<ICalendarYearUser> {
  constructor(private service: CalendarYearUserService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICalendarYearUser> | Observable<never> {
    const id = route.params["id"]
    if (id) {
      return this.service.find(id).pipe(
        flatMap((calendarYearUser: HttpResponse<CalendarYearUser>) => {
          if (calendarYearUser.body) {
            return of(calendarYearUser.body)
          } else {
            this.router.navigate(["404"])
            return EMPTY
          }
        })
      )
    }
    return of(new CalendarYearUser())
  }
}

export const calendarYearUserRoute: Routes = [
  {
    path: "",
    component: CalendarYearUserComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: "citmilApp.calendarYearUser.home.title"
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ":id/view",
    component: CalendarYearUserDetailComponent,
    resolve: {
      calendarYearUser: CalendarYearUserResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: "citmilApp.calendarYearUser.home.title"
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: "new",
    component: CalendarYearUserUpdateComponent,
    resolve: {
      calendarYearUser: CalendarYearUserResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: "citmilApp.calendarYearUser.home.title"
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ":id/edit",
    component: CalendarYearUserUpdateComponent,
    resolve: {
      calendarYearUser: CalendarYearUserResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: "citmilApp.calendarYearUser.home.title"
    },
    canActivate: [UserRouteAccessService]
  }
]
