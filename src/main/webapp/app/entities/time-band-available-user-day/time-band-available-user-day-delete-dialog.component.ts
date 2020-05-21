import { Component } from "@angular/core"
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap"
import { JhiEventManager } from "ng-jhipster"

import { ITimeBandAvailableUserDay } from "app/shared/model/time-band-available-user-day.model"
import { TimeBandAvailableUserDayService } from "./time-band-available-user-day.service"

@Component({
  templateUrl: "./time-band-available-user-day-delete-dialog.component.html"
})
export class TimeBandAvailableUserDayDeleteDialogComponent {
  timeBandAvailableUserDay?: ITimeBandAvailableUserDay

  constructor(protected timeBandAvailableUserDayService: TimeBandAvailableUserDayService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss()
  }

  confirmDelete(id: number): void {
    this.timeBandAvailableUserDayService.delete(id).subscribe(() => {
      this.eventManager.broadcast("timeBandAvailableUserDayListModification")
      this.activeModal.close()
    })
  }
}
