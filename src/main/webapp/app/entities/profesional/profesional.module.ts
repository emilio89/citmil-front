import { NgModule } from "@angular/core"
import { RouterModule } from "@angular/router"

import { CitmilSharedModule } from "app/shared/shared.module"
import { ProfesionalComponent } from "./profesional.component"
import { ProfesionalDetailComponent } from "./profesional-detail.component"
import { ProfesionalUpdateComponent } from "./profesional-update.component"
import { ProfesionalDeleteDialogComponent } from "./profesional-delete-dialog.component"
import { profesionalRoute } from "./profesional.route"

@NgModule({
  imports: [CitmilSharedModule, RouterModule.forChild(profesionalRoute)],
  declarations: [ProfesionalComponent, ProfesionalDetailComponent, ProfesionalUpdateComponent, ProfesionalDeleteDialogComponent],
  entryComponents: [ProfesionalDeleteDialogComponent]
})
export class CitmilProfesionalModule {}
