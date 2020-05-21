import { Component } from "@angular/core"
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap"
import { JhiEventManager } from "ng-jhipster"

import { ITimeBand } from "app/shared/model/time-band.model"
import { TimeBandService } from "./time-band.service"

@Component({
  templateUrl: "./time-band-delete-dialog.component.html"
})
export class TimeBandDeleteDialogComponent {
  timeBand?: ITimeBand

  constructor(protected timeBandService: TimeBandService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss()
  }

  confirmDelete(id: number): void {
    this.timeBandService.delete(id).subscribe(() => {
      this.eventManager.broadcast("timeBandListModification")
      this.activeModal.close()
    })
  }
}
