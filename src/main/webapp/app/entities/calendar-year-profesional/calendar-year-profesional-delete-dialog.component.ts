import { Component } from "@angular/core"
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap"
import { JhiEventManager } from "ng-jhipster"

import { ICalendarYearProfesional } from "app/shared/model/calendar-year-profesional.model"
import { CalendarYearProfesionalService } from "./calendar-year-profesional.service"

@Component({
  templateUrl: "./calendar-year-profesional-delete-dialog.component.html"
})
export class CalendarYearProfesionalDeleteDialogComponent {
  calendarYearProfesional?: ICalendarYearProfesional

  constructor(protected calendarYearProfesionalService: CalendarYearProfesionalService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss()
  }

  confirmDelete(id: number): void {
    this.calendarYearProfesionalService.delete(id).subscribe(() => {
      this.eventManager.broadcast("calendarYearProfesionalListModification")
      this.activeModal.close()
    })
  }
}
