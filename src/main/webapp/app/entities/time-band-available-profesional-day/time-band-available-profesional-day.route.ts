import { Injectable } from "@angular/core"
import { HttpResponse } from "@angular/common/http"
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from "@angular/router"
import { Observable, of, EMPTY } from "rxjs"
import { flatMap } from "rxjs/operators"

import { Authority } from "app/shared/constants/authority.constants"
import { UserRouteAccessService } from "app/core/auth/user-route-access-service"
import { ITimeBandAvailableProfesionalDay, TimeBandAvailableProfesionalDay } from "app/shared/model/time-band-available-profesional-day.model"
import { TimeBandAvailableProfesionalDayService } from "./time-band-available-profesional-day.service"
import { TimeBandAvailableProfesionalDayComponent } from "./time-band-available-profesional-day.component"
import { TimeBandAvailableProfesionalDayDetailComponent } from "./time-band-available-profesional-day-detail.component"
import { TimeBandAvailableProfesionalDayUpdateComponent } from "./time-band-available-profesional-day-update.component"

@Injectable({ providedIn: "root" })
export class TimeBandAvailableProfesionalDayResolve implements Resolve<ITimeBandAvailableProfesionalDay> {
  constructor(private service: TimeBandAvailableProfesionalDayService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITimeBandAvailableProfesionalDay> | Observable<never> {
    const id = route.params["id"]
    if (id) {
      return this.service.find(id).pipe(
        flatMap((timeBandAvailableProfesionalDay: HttpResponse<TimeBandAvailableProfesionalDay>) => {
          if (timeBandAvailableProfesionalDay.body) {
            return of(timeBandAvailableProfesionalDay.body)
          } else {
            this.router.navigate(["404"])
            return EMPTY
          }
        })
      )
    }
    return of(new TimeBandAvailableProfesionalDay())
  }
}

export const timeBandAvailableProfesionalDayRoute: Routes = [
  {
    path: "",
    component: TimeBandAvailableProfesionalDayComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: "citmilApp.timeBandAvailableProfesionalDay.home.title"
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ":id/view",
    component: TimeBandAvailableProfesionalDayDetailComponent,
    resolve: {
      timeBandAvailableProfesionalDay: TimeBandAvailableProfesionalDayResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: "citmilApp.timeBandAvailableProfesionalDay.home.title"
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: "new",
    component: TimeBandAvailableProfesionalDayUpdateComponent,
    resolve: {
      timeBandAvailableProfesionalDay: TimeBandAvailableProfesionalDayResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: "citmilApp.timeBandAvailableProfesionalDay.home.title"
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ":id/edit",
    component: TimeBandAvailableProfesionalDayUpdateComponent,
    resolve: {
      timeBandAvailableProfesionalDay: TimeBandAvailableProfesionalDayResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: "citmilApp.timeBandAvailableProfesionalDay.home.title"
    },
    canActivate: [UserRouteAccessService]
  }
]
