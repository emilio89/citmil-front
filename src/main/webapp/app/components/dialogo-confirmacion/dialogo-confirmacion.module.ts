import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"

import { ReactiveFormsModule, FormsModule } from "@angular/forms"
import { JhMaterialModule } from "app/shared/jh-material.module"
import { DialogoConfirmacionComponent } from "./dialogo-confirmacion.component"

@NgModule({
  declarations: [DialogoConfirmacionComponent],
  imports: [ReactiveFormsModule, CommonModule, JhMaterialModule, FormsModule]
})
export class DialogoConfirmacionModule {}
