import { Component } from "@angular/core"
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap"
import { JhiEventManager } from "ng-jhipster"

import { IPublicHoliday } from "app/shared/model/public-holiday.model"
import { PublicHolidayService } from "./public-holiday.service"

@Component({
  templateUrl: "./public-holiday-delete-dialog.component.html"
})
export class PublicHolidayDeleteDialogComponent {
  publicHoliday?: IPublicHoliday

  constructor(protected publicHolidayService: PublicHolidayService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss()
  }

  confirmDelete(id: number): void {
    this.publicHolidayService.delete(id).subscribe(() => {
      this.eventManager.broadcast("publicHolidayListModification")
      this.activeModal.close()
    })
  }
}
