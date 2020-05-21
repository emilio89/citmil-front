import { Injectable } from "@angular/core"
import { HttpResponse } from "@angular/common/http"
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from "@angular/router"
import { Observable, of, EMPTY } from "rxjs"
import { flatMap } from "rxjs/operators"

import { Authority } from "app/shared/constants/authority.constants"
import { UserRouteAccessService } from "app/core/auth/user-route-access-service"
import { ICalendarYearProfesional, CalendarYearProfesional } from "app/shared/model/calendar-year-profesional.model"
import { CalendarYearProfesionalService } from "./calendar-year-profesional.service"
import { CalendarYearProfesionalComponent } from "./calendar-year-profesional.component"
import { CalendarYearProfesionalDetailComponent } from "./calendar-year-profesional-detail.component"
import { CalendarYearProfesionalUpdateComponent } from "./calendar-year-profesional-update.component"

@Injectable({ providedIn: "root" })
export class CalendarYearProfesionalResolve implements Resolve<ICalendarYearProfesional> {
  constructor(private service: CalendarYearProfesionalService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICalendarYearProfesional> | Observable<never> {
    const id = route.params["id"]
    if (id) {
      return this.service.find(id).pipe(
        flatMap((calendarYearProfesional: HttpResponse<CalendarYearProfesional>) => {
          if (calendarYearProfesional.body) {
            return of(calendarYearProfesional.body)
          } else {
            this.router.navigate(["404"])
            return EMPTY
          }
        })
      )
    }
    return of(new CalendarYearProfesional())
  }
}

export const calendarYearProfesionalRoute: Routes = [
  {
    path: "",
    component: CalendarYearProfesionalComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: "citmilApp.calendarYearProfesional.home.title"
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ":id/view",
    component: CalendarYearProfesionalDetailComponent,
    resolve: {
      calendarYearProfesional: CalendarYearProfesionalResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: "citmilApp.calendarYearProfesional.home.title"
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: "new",
    component: CalendarYearProfesionalUpdateComponent,
    resolve: {
      calendarYearProfesional: CalendarYearProfesionalResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: "citmilApp.calendarYearProfesional.home.title"
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ":id/edit",
    component: CalendarYearProfesionalUpdateComponent,
    resolve: {
      calendarYearProfesional: CalendarYearProfesionalResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: "citmilApp.calendarYearProfesional.home.title"
    },
    canActivate: [UserRouteAccessService]
  }
]
