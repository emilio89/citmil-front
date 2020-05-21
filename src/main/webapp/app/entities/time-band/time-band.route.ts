import { Injectable } from "@angular/core"
import { HttpResponse } from "@angular/common/http"
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from "@angular/router"
import { Observable, of, EMPTY } from "rxjs"
import { flatMap } from "rxjs/operators"

import { Authority } from "app/shared/constants/authority.constants"
import { UserRouteAccessService } from "app/core/auth/user-route-access-service"
import { ITimeBand, TimeBand } from "app/shared/model/time-band.model"
import { TimeBandService } from "./time-band.service"
import { TimeBandComponent } from "./time-band.component"
import { TimeBandDetailComponent } from "./time-band-detail.component"
import { TimeBandUpdateComponent } from "./time-band-update.component"

@Injectable({ providedIn: "root" })
export class TimeBandResolve implements Resolve<ITimeBand> {
  constructor(private service: TimeBandService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITimeBand> | Observable<never> {
    const id = route.params["id"]
    if (id) {
      return this.service.find(id).pipe(
        flatMap((timeBand: HttpResponse<TimeBand>) => {
          if (timeBand.body) {
            return of(timeBand.body)
          } else {
            this.router.navigate(["404"])
            return EMPTY
          }
        })
      )
    }
    return of(new TimeBand())
  }
}

export const timeBandRoute: Routes = [
  {
    path: "",
    component: TimeBandComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: "citmilApp.timeBand.home.title"
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ":id/view",
    component: TimeBandDetailComponent,
    resolve: {
      timeBand: TimeBandResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: "citmilApp.timeBand.home.title"
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: "new",
    component: TimeBandUpdateComponent,
    resolve: {
      timeBand: TimeBandResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: "citmilApp.timeBand.home.title"
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ":id/edit",
    component: TimeBandUpdateComponent,
    resolve: {
      timeBand: TimeBandResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: "citmilApp.timeBand.home.title"
    },
    canActivate: [UserRouteAccessService]
  }
]
