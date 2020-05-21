import { Injectable } from "@angular/core"
import { HttpResponse } from "@angular/common/http"
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from "@angular/router"
import { Observable, of, EMPTY } from "rxjs"
import { flatMap } from "rxjs/operators"

import { Authority } from "app/shared/constants/authority.constants"
import { UserRouteAccessService } from "app/core/auth/user-route-access-service"
import { IPublicHoliday, PublicHoliday } from "app/shared/model/public-holiday.model"
import { PublicHolidayService } from "./public-holiday.service"
import { PublicHolidayComponent } from "./public-holiday.component"
import { PublicHolidayDetailComponent } from "./public-holiday-detail.component"
import { PublicHolidayUpdateComponent } from "./public-holiday-update.component"

@Injectable({ providedIn: "root" })
export class PublicHolidayResolve implements Resolve<IPublicHoliday> {
  constructor(private service: PublicHolidayService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPublicHoliday> | Observable<never> {
    const id = route.params["id"]
    if (id) {
      return this.service.find(id).pipe(
        flatMap((publicHoliday: HttpResponse<PublicHoliday>) => {
          if (publicHoliday.body) {
            return of(publicHoliday.body)
          } else {
            this.router.navigate(["404"])
            return EMPTY
          }
        })
      )
    }
    return of(new PublicHoliday())
  }
}

export const publicHolidayRoute: Routes = [
  {
    path: "",
    component: PublicHolidayComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: "citmilApp.publicHoliday.home.title"
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ":id/view",
    component: PublicHolidayDetailComponent,
    resolve: {
      publicHoliday: PublicHolidayResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: "citmilApp.publicHoliday.home.title"
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: "new",
    component: PublicHolidayUpdateComponent,
    resolve: {
      publicHoliday: PublicHolidayResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: "citmilApp.publicHoliday.home.title"
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ":id/edit",
    component: PublicHolidayUpdateComponent,
    resolve: {
      publicHoliday: PublicHolidayResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: "citmilApp.publicHoliday.home.title"
    },
    canActivate: [UserRouteAccessService]
  }
]
