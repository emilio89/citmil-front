import { Injectable } from "@angular/core"
import { HttpResponse } from "@angular/common/http"
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from "@angular/router"
import { Observable, of, EMPTY } from "rxjs"
import { flatMap } from "rxjs/operators"

import { Authority } from "app/shared/constants/authority.constants"
import { UserRouteAccessService } from "app/core/auth/user-route-access-service"
import { ITimeBandAvailableUserDay, TimeBandAvailableUserDay } from "app/shared/model/time-band-available-user-day.model"
import { TimeBandAvailableUserDayService } from "./time-band-available-user-day.service"
import { TimeBandAvailableUserDayComponent } from "./time-band-available-user-day.component"
import { TimeBandAvailableUserDayDetailComponent } from "./time-band-available-user-day-detail.component"
import { TimeBandAvailableUserDayUpdateComponent } from "./time-band-available-user-day-update.component"

@Injectable({ providedIn: "root" })
export class TimeBandAvailableUserDayResolve implements Resolve<ITimeBandAvailableUserDay> {
  constructor(private service: TimeBandAvailableUserDayService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITimeBandAvailableUserDay> | Observable<never> {
    const id = route.params["id"]
    if (id) {
      return this.service.find(id).pipe(
        flatMap((timeBandAvailableUserDay: HttpResponse<TimeBandAvailableUserDay>) => {
          if (timeBandAvailableUserDay.body) {
            return of(timeBandAvailableUserDay.body)
          } else {
            this.router.navigate(["404"])
            return EMPTY
          }
        })
      )
    }
    return of(new TimeBandAvailableUserDay())
  }
}

export const timeBandAvailableUserDayRoute: Routes = [
  {
    path: "",
    component: TimeBandAvailableUserDayComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: "citmilApp.timeBandAvailableUserDay.home.title"
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ":id/view",
    component: TimeBandAvailableUserDayDetailComponent,
    resolve: {
      timeBandAvailableUserDay: TimeBandAvailableUserDayResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: "citmilApp.timeBandAvailableUserDay.home.title"
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: "new",
    component: TimeBandAvailableUserDayUpdateComponent,
    resolve: {
      timeBandAvailableUserDay: TimeBandAvailableUserDayResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: "citmilApp.timeBandAvailableUserDay.home.title"
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ":id/edit",
    component: TimeBandAvailableUserDayUpdateComponent,
    resolve: {
      timeBandAvailableUserDay: TimeBandAvailableUserDayResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: "citmilApp.timeBandAvailableUserDay.home.title"
    },
    canActivate: [UserRouteAccessService]
  }
]
