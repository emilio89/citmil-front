import { Component } from "@angular/core"
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap"
import { JhiEventManager } from "ng-jhipster"

import { ICalendarYearUser } from "app/shared/model/calendar-year-user.model"
import { CalendarYearUserService } from "./calendar-year-user.service"

@Component({
  templateUrl: "./calendar-year-user-delete-dialog.component.html"
})
export class CalendarYearUserDeleteDialogComponent {
  calendarYearUser?: ICalendarYearUser

  constructor(protected calendarYearUserService: CalendarYearUserService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss()
  }

  confirmDelete(id: number): void {
    this.calendarYearUserService.delete(id).subscribe(() => {
      this.eventManager.broadcast("calendarYearUserListModification")
      this.activeModal.close()
    })
  }
}
