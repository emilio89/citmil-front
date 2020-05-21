import { NgModule } from "@angular/core"
import { RouterModule } from "@angular/router"

import { CitmilSharedModule } from "app/shared/shared.module"
import { TypeServiceComponent } from "./type-service.component"
import { TypeServiceDetailComponent } from "./type-service-detail.component"
import { TypeServiceUpdateComponent } from "./type-service-update.component"
import { TypeServiceDeleteDialogComponent } from "./type-service-delete-dialog.component"
import { typeServiceRoute } from "./type-service.route"

@NgModule({
  imports: [CitmilSharedModule, RouterModule.forChild(typeServiceRoute)],
  declarations: [TypeServiceComponent, TypeServiceDetailComponent, TypeServiceUpdateComponent, TypeServiceDeleteDialogComponent],
  entryComponents: [TypeServiceDeleteDialogComponent]
})
export class CitmilTypeServiceModule {}
