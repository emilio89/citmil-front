import { Component } from "@angular/core"
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap"
import { JhiEventManager } from "ng-jhipster"

import { IDynamicContent } from "app/shared/model/dynamic-content.model"
import { DynamicContentService } from "./dynamic-content.service"

@Component({
  templateUrl: "./dynamic-content-delete-dialog.component.html"
})
export class DynamicContentDeleteDialogComponent {
  dynamicContent?: IDynamicContent

  constructor(protected dynamicContentService: DynamicContentService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss()
  }

  confirmDelete(id: number): void {
    this.dynamicContentService.delete(id).subscribe(() => {
      this.eventManager.broadcast("dynamicContentListModification")
      this.activeModal.close()
    })
  }
}
