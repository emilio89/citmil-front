import { Component } from "@angular/core"
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap"
import { JhiEventManager } from "ng-jhipster"

import { IMenuOptionsAvailable } from "app/shared/model/menu-options-available.model"
import { MenuOptionsAvailableService } from "./menu-options-available.service"

@Component({
  templateUrl: "./menu-options-available-delete-dialog.component.html"
})
export class MenuOptionsAvailableDeleteDialogComponent {
  menuOptionsAvailable?: IMenuOptionsAvailable

  constructor(protected menuOptionsAvailableService: MenuOptionsAvailableService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss()
  }

  confirmDelete(id: number): void {
    this.menuOptionsAvailableService.delete(id).subscribe(() => {
      this.eventManager.broadcast("menuOptionsAvailableListModification")
      this.activeModal.close()
    })
  }
}
