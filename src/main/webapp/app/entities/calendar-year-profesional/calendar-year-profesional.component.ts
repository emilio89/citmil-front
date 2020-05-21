import { Component, OnInit, OnDestroy } from "@angular/core"
import { HttpResponse } from "@angular/common/http"
import { Subscription } from "rxjs"
import { JhiEventManager } from "ng-jhipster"
import { NgbModal } from "@ng-bootstrap/ng-bootstrap"

import { ICalendarYearProfesional } from "app/shared/model/calendar-year-profesional.model"
import { CalendarYearProfesionalService } from "./calendar-year-profesional.service"
import { CalendarYearProfesionalDeleteDialogComponent } from "./calendar-year-profesional-delete-dialog.component"

@Component({
  selector: "jhi-calendar-year-profesional",
  templateUrl: "./calendar-year-profesional.component.html"
})
export class CalendarYearProfesionalComponent implements OnInit, OnDestroy {
  calendarYearProfesionals?: ICalendarYearProfesional[]
  eventSubscriber?: Subscription

  constructor(protected calendarYearProfesionalService: CalendarYearProfesionalService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.calendarYearProfesionalService.query().subscribe((res: HttpResponse<ICalendarYearProfesional[]>) => (this.calendarYearProfesionals = res.body || []))
  }

  ngOnInit(): void {
    this.loadAll()
    this.registerChangeInCalendarYearProfesionals()
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber)
    }
  }

  trackId(index: number, item: ICalendarYearProfesional): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!
  }

  registerChangeInCalendarYearProfesionals(): void {
    this.eventSubscriber = this.eventManager.subscribe("calendarYearProfesionalListModification", () => this.loadAll())
  }

  delete(calendarYearProfesional: ICalendarYearProfesional): void {
    const modalRef = this.modalService.open(CalendarYearProfesionalDeleteDialogComponent, { size: "lg", backdrop: "static" })
    modalRef.componentInstance.calendarYearProfesional = calendarYearProfesional
  }
}
