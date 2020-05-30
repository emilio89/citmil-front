import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"

import { ReactiveFormsModule, FormsModule } from "@angular/forms"
import { JhMaterialModule } from "app/shared/jh-material.module"
import { ModelEditWorkingDayComponent } from "./model-edit-working-day.component"

@NgModule({
  declarations: [ModelEditWorkingDayComponent],
  imports: [ReactiveFormsModule, CommonModule, JhMaterialModule, FormsModule]
})
export class ModelEditWorkingDayModule {}
