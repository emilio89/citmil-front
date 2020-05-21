import { Component } from "@angular/core"
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap"
import { JhiEventManager } from "ng-jhipster"

import { ITimeBandAvailableProfesionalDay } from "app/shared/model/time-band-available-profesional-day.model"
import { TimeBandAvailableProfesionalDayService } from "./time-band-available-profesional-day.service"

@Component({
  templateUrl: "./time-band-available-profesional-day-delete-dialog.component.html"
})
export class TimeBandAvailableProfesionalDayDeleteDialogComponent {
  timeBandAvailableProfesionalDay?: ITimeBandAvailableProfesionalDay

  constructor(
    protected timeBandAvailableProfesionalDayService: TimeBandAvailableProfesionalDayService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss()
  }

  confirmDelete(id: number): void {
    this.timeBandAvailableProfesionalDayService.delete(id).subscribe(() => {
      this.eventManager.broadcast("timeBandAvailableProfesionalDayListModification")
      this.activeModal.close()
    })
  }
}
