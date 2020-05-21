import { NgModule } from "@angular/core"
import { RouterModule } from "@angular/router"

import { CitmilSharedModule } from "app/shared/shared.module"
import { MenuOptionsAvailableComponent } from "./menu-options-available.component"
import { MenuOptionsAvailableDetailComponent } from "./menu-options-available-detail.component"
import { MenuOptionsAvailableUpdateComponent } from "./menu-options-available-update.component"
import { MenuOptionsAvailableDeleteDialogComponent } from "./menu-options-available-delete-dialog.component"
import { menuOptionsAvailableRoute } from "./menu-options-available.route"

@NgModule({
  imports: [CitmilSharedModule, RouterModule.forChild(menuOptionsAvailableRoute)],
  declarations: [MenuOptionsAvailableComponent, MenuOptionsAvailableDetailComponent, MenuOptionsAvailableUpdateComponent, MenuOptionsAvailableDeleteDialogComponent],
  entryComponents: [MenuOptionsAvailableDeleteDialogComponent]
})
export class CitmilMenuOptionsAvailableModule {}
