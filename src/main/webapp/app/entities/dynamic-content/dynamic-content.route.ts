import { Injectable } from "@angular/core"
import { HttpResponse } from "@angular/common/http"
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from "@angular/router"
import { JhiResolvePagingParams } from "ng-jhipster"
import { Observable, of, EMPTY } from "rxjs"
import { flatMap } from "rxjs/operators"

import { Authority } from "app/shared/constants/authority.constants"
import { UserRouteAccessService } from "app/core/auth/user-route-access-service"
import { IDynamicContent, DynamicContent } from "app/shared/model/dynamic-content.model"
import { DynamicContentService } from "./dynamic-content.service"
import { DynamicContentComponent } from "./dynamic-content.component"
import { DynamicContentDetailComponent } from "./dynamic-content-detail.component"
import { DynamicContentUpdateComponent } from "./dynamic-content-update.component"

@Injectable({ providedIn: "root" })
export class DynamicContentResolve implements Resolve<IDynamicContent> {
  constructor(private service: DynamicContentService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDynamicContent> | Observable<never> {
    const id = route.params["id"]
    if (id) {
      return this.service.find(id).pipe(
        flatMap((dynamicContent: HttpResponse<DynamicContent>) => {
          if (dynamicContent.body) {
            return of(dynamicContent.body)
          } else {
            this.router.navigate(["404"])
            return EMPTY
          }
        })
      )
    }
    return of(new DynamicContent())
  }
}

export const dynamicContentRoute: Routes = [
  {
    path: "",
    component: DynamicContentComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: [Authority.USER],
      defaultSort: "id,asc",
      pageTitle: "citmilApp.dynamicContent.home.title"
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ":id/view",
    component: DynamicContentDetailComponent,
    resolve: {
      dynamicContent: DynamicContentResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: "citmilApp.dynamicContent.home.title"
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: "new",
    component: DynamicContentUpdateComponent,
    resolve: {
      dynamicContent: DynamicContentResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: "citmilApp.dynamicContent.home.title"
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ":id/edit",
    component: DynamicContentUpdateComponent,
    resolve: {
      dynamicContent: DynamicContentResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: "citmilApp.dynamicContent.home.title"
    },
    canActivate: [UserRouteAccessService]
  }
]
