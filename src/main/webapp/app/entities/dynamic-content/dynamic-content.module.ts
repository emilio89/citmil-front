import { NgModule } from "@angular/core"
import { RouterModule } from "@angular/router"

import { CitmilSharedModule } from "app/shared/shared.module"
import { DynamicContentComponent } from "./dynamic-content.component"
import { DynamicContentDetailComponent } from "./dynamic-content-detail.component"
import { DynamicContentUpdateComponent } from "./dynamic-content-update.component"
import { DynamicContentDeleteDialogComponent } from "./dynamic-content-delete-dialog.component"
import { dynamicContentRoute } from "./dynamic-content.route"

@NgModule({
  imports: [CitmilSharedModule, RouterModule.forChild(dynamicContentRoute)],
  declarations: [DynamicContentComponent, DynamicContentDetailComponent, DynamicContentUpdateComponent, DynamicContentDeleteDialogComponent],
  entryComponents: [DynamicContentDeleteDialogComponent]
})
export class CitmilDynamicContentModule {}
