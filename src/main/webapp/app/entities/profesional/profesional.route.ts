import { Injectable } from "@angular/core"
import { HttpResponse } from "@angular/common/http"
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from "@angular/router"
import { JhiResolvePagingParams } from "ng-jhipster"
import { Observable, of, EMPTY } from "rxjs"
import { flatMap } from "rxjs/operators"

import { Authority } from "app/shared/constants/authority.constants"
import { UserRouteAccessService } from "app/core/auth/user-route-access-service"
import { IProfesional, Profesional } from "app/shared/model/profesional.model"
import { ProfesionalService } from "./profesional.service"
import { ProfesionalComponent } from "./profesional.component"
import { ProfesionalDetailComponent } from "./profesional-detail.component"
import { ProfesionalUpdateComponent } from "./profesional-update.component"

@Injectable({ providedIn: "root" })
export class ProfesionalResolve implements Resolve<IProfesional> {
  constructor(private service: ProfesionalService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProfesional> | Observable<never> {
    const id = route.params["id"]
    if (id) {
      return this.service.find(id).pipe(
        flatMap((profesional: HttpResponse<Profesional>) => {
          if (profesional.body) {
            return of(profesional.body)
          } else {
            this.router.navigate(["404"])
            return EMPTY
          }
        })
      )
    }
    return of(new Profesional())
  }
}

export const profesionalRoute: Routes = [
  {
    path: "",
    component: ProfesionalComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: [Authority.USER],
      defaultSort: "id,asc",
      pageTitle: "citmilApp.profesional.home.title"
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ":id/view",
    component: ProfesionalDetailComponent,
    resolve: {
      profesional: ProfesionalResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: "citmilApp.profesional.home.title"
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: "new",
    component: ProfesionalUpdateComponent,
    resolve: {
      profesional: ProfesionalResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: "citmilApp.profesional.home.title"
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ":id/edit",
    component: ProfesionalUpdateComponent,
    resolve: {
      profesional: ProfesionalResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: "citmilApp.profesional.home.title"
    },
    canActivate: [UserRouteAccessService]
  }
]
