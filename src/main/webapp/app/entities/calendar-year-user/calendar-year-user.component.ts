import { Component, OnInit, OnDestroy } from "@angular/core"
import { HttpResponse } from "@angular/common/http"
import { Subscription } from "rxjs"
import { JhiEventManager } from "ng-jhipster"
import { NgbModal } from "@ng-bootstrap/ng-bootstrap"

import { ICalendarYearUser } from "app/shared/model/calendar-year-user.model"
import { CalendarYearUserService } from "./calendar-year-user.service"
import { CalendarYearUserDeleteDialogComponent } from "./calendar-year-user-delete-dialog.component"

@Component({
  selector: "jhi-calendar-year-user",
  templateUrl: "./calendar-year-user.component.html"
})
export class CalendarYearUserComponent implements OnInit, OnDestroy {
  calendarYearUsers?: ICalendarYearUser[]
  eventSubscriber?: Subscription

  constructor(protected calendarYearUserService: CalendarYearUserService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.calendarYearUserService.query().subscribe((res: HttpResponse<ICalendarYearUser[]>) => (this.calendarYearUsers = res.body || []))
  }

  ngOnInit(): void {
    this.loadAll()
    this.registerChangeInCalendarYearUsers()
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber)
    }
  }

  trackId(index: number, item: ICalendarYearUser): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!
  }

  registerChangeInCalendarYearUsers(): void {
    this.eventSubscriber = this.eventManager.subscribe("calendarYearUserListModification", () => this.loadAll())
  }

  delete(calendarYearUser: ICalendarYearUser): void {
    const modalRef = this.modalService.open(CalendarYearUserDeleteDialogComponent, { size: "lg", backdrop: "static" })
    modalRef.componentInstance.calendarYearUser = calendarYearUser
  }
}
