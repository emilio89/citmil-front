import { Injectable } from "@angular/core"
import { HttpResponse } from "@angular/common/http"
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from "@angular/router"
import { Observable, of, EMPTY } from "rxjs"
import { flatMap } from "rxjs/operators"

import { Authority } from "app/shared/constants/authority.constants"
import { UserRouteAccessService } from "app/core/auth/user-route-access-service"
import { IMenuOptionsAvailable, MenuOptionsAvailable } from "app/shared/model/menu-options-available.model"
import { MenuOptionsAvailableService } from "./menu-options-available.service"
import { MenuOptionsAvailableComponent } from "./menu-options-available.component"
import { MenuOptionsAvailableDetailComponent } from "./menu-options-available-detail.component"
import { MenuOptionsAvailableUpdateComponent } from "./menu-options-available-update.component"

@Injectable({ providedIn: "root" })
export class MenuOptionsAvailableResolve implements Resolve<IMenuOptionsAvailable> {
  constructor(private service: MenuOptionsAvailableService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMenuOptionsAvailable> | Observable<never> {
    const id = route.params["id"]
    if (id) {
      return this.service.find(id).pipe(
        flatMap((menuOptionsAvailable: HttpResponse<MenuOptionsAvailable>) => {
          if (menuOptionsAvailable.body) {
            return of(menuOptionsAvailable.body)
          } else {
            this.router.navigate(["404"])
            return EMPTY
          }
        })
      )
    }
    return of(new MenuOptionsAvailable())
  }
}

export const menuOptionsAvailableRoute: Routes = [
  {
    path: "",
    component: MenuOptionsAvailableComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: "citmilApp.menuOptionsAvailable.home.title"
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ":id/view",
    component: MenuOptionsAvailableDetailComponent,
    resolve: {
      menuOptionsAvailable: MenuOptionsAvailableResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: "citmilApp.menuOptionsAvailable.home.title"
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: "new",
    component: MenuOptionsAvailableUpdateComponent,
    resolve: {
      menuOptionsAvailable: MenuOptionsAvailableResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: "citmilApp.menuOptionsAvailable.home.title"
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ":id/edit",
    component: MenuOptionsAvailableUpdateComponent,
    resolve: {
      menuOptionsAvailable: MenuOptionsAvailableResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: "citmilApp.menuOptionsAvailable.home.title"
    },
    canActivate: [UserRouteAccessService]
  }
]
