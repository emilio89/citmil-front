import { Component } from "@angular/core"
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap"
import { JhiEventManager } from "ng-jhipster"

import { IProfesional } from "app/shared/model/profesional.model"
import { ProfesionalService } from "./profesional.service"

@Component({
  templateUrl: "./profesional-delete-dialog.component.html"
})
export class ProfesionalDeleteDialogComponent {
  profesional?: IProfesional

  constructor(protected profesionalService: ProfesionalService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss()
  }

  confirmDelete(id: number): void {
    this.profesionalService.delete(id).subscribe(() => {
      this.eventManager.broadcast("profesionalListModification")
      this.activeModal.close()
    })
  }
}
