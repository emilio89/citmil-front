import { Injectable } from "@angular/core"
import { HttpResponse } from "@angular/common/http"
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from "@angular/router"
import { JhiResolvePagingParams } from "ng-jhipster"
import { Observable, of, EMPTY } from "rxjs"
import { flatMap } from "rxjs/operators"

import { Authority } from "app/shared/constants/authority.constants"
import { UserRouteAccessService } from "app/core/auth/user-route-access-service"
import { ITypeService, TypeService } from "app/shared/model/type-service.model"
import { TypeServiceService } from "./type-service.service"
import { TypeServiceComponent } from "./type-service.component"
import { TypeServiceDetailComponent } from "./type-service-detail.component"
import { TypeServiceUpdateComponent } from "./type-service-update.component"

@Injectable({ providedIn: "root" })
export class TypeServiceResolve implements Resolve<ITypeService> {
  constructor(private service: TypeServiceService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITypeService> | Observable<never> {
    const id = route.params["id"]
    if (id) {
      return this.service.find(id).pipe(
        flatMap((typeService: HttpResponse<TypeService>) => {
          if (typeService.body) {
            return of(typeService.body)
          } else {
            this.router.navigate(["404"])
            return EMPTY
          }
        })
      )
    }
    return of(new TypeService())
  }
}

export const typeServiceRoute: Routes = [
  {
    path: "",
    component: TypeServiceComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: [Authority.USER],
      defaultSort: "id,asc",
      pageTitle: "citmilApp.typeService.home.title"
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ":id/view",
    component: TypeServiceDetailComponent,
    resolve: {
      typeService: TypeServiceResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: "citmilApp.typeService.home.title"
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: "new",
    component: TypeServiceUpdateComponent,
    resolve: {
      typeService: TypeServiceResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: "citmilApp.typeService.home.title"
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ":id/edit",
    component: TypeServiceUpdateComponent,
    resolve: {
      typeService: TypeServiceResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: "citmilApp.typeService.home.title"
    },
    canActivate: [UserRouteAccessService]
  }
]
