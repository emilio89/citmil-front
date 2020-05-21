import { Component } from "@angular/core"
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap"
import { JhiEventManager } from "ng-jhipster"

import { ITypeService } from "app/shared/model/type-service.model"
import { TypeServiceService } from "./type-service.service"

@Component({
  templateUrl: "./type-service-delete-dialog.component.html"
})
export class TypeServiceDeleteDialogComponent {
  typeService?: ITypeService

  constructor(protected typeServiceService: TypeServiceService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss()
  }

  confirmDelete(id: number): void {
    this.typeServiceService.delete(id).subscribe(() => {
      this.eventManager.broadcast("typeServiceListModification")
      this.activeModal.close()
    })
  }
}
