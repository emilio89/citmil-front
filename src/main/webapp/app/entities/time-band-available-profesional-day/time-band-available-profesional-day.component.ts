import { Component, OnInit, OnDestroy } from "@angular/core"
import { HttpResponse } from "@angular/common/http"
import { Subscription } from "rxjs"
import { JhiEventManager } from "ng-jhipster"
import { NgbModal } from "@ng-bootstrap/ng-bootstrap"

import { ITimeBandAvailableProfesionalDay } from "app/shared/model/time-band-available-profesional-day.model"
import { TimeBandAvailableProfesionalDayService } from "./time-band-available-profesional-day.service"
import { TimeBandAvailableProfesionalDayDeleteDialogComponent } from "./time-band-available-profesional-day-delete-dialog.component"

@Component({
  selector: "jhi-time-band-available-profesional-day",
  templateUrl: "./time-band-available-profesional-day.component.html"
})
export class TimeBandAvailableProfesionalDayComponent implements OnInit, OnDestroy {
  timeBandAvailableProfesionalDays?: ITimeBandAvailableProfesionalDay[]
  eventSubscriber?: Subscription

  constructor(
    protected timeBandAvailableProfesionalDayService: TimeBandAvailableProfesionalDayService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.timeBandAvailableProfesionalDayService
      .query()
      .subscribe((res: HttpResponse<ITimeBandAvailableProfesionalDay[]>) => (this.timeBandAvailableProfesionalDays = res.body || []))
  }

  ngOnInit(): void {
    this.loadAll()
    this.registerChangeInTimeBandAvailableProfesionalDays()
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber)
    }
  }

  trackId(index: number, item: ITimeBandAvailableProfesionalDay): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!
  }

  registerChangeInTimeBandAvailableProfesionalDays(): void {
    this.eventSubscriber = this.eventManager.subscribe("timeBandAvailableProfesionalDayListModification", () => this.loadAll())
  }

  delete(timeBandAvailableProfesionalDay: ITimeBandAvailableProfesionalDay): void {
    const modalRef = this.modalService.open(TimeBandAvailableProfesionalDayDeleteDialogComponent, { size: "lg", backdrop: "static" })
    modalRef.componentInstance.timeBandAvailableProfesionalDay = timeBandAvailableProfesionalDay
  }
}
