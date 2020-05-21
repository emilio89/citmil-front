import { Component, OnInit, OnDestroy } from "@angular/core"
import { HttpResponse } from "@angular/common/http"
import { Subscription } from "rxjs"
import { JhiEventManager } from "ng-jhipster"
import { NgbModal } from "@ng-bootstrap/ng-bootstrap"

import { ITimeBandAvailableUserDay } from "app/shared/model/time-band-available-user-day.model"
import { TimeBandAvailableUserDayService } from "./time-band-available-user-day.service"
import { TimeBandAvailableUserDayDeleteDialogComponent } from "./time-band-available-user-day-delete-dialog.component"

@Component({
  selector: "jhi-time-band-available-user-day",
  templateUrl: "./time-band-available-user-day.component.html"
})
export class TimeBandAvailableUserDayComponent implements OnInit, OnDestroy {
  timeBandAvailableUserDays?: ITimeBandAvailableUserDay[]
  eventSubscriber?: Subscription

  constructor(protected timeBandAvailableUserDayService: TimeBandAvailableUserDayService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.timeBandAvailableUserDayService.query().subscribe((res: HttpResponse<ITimeBandAvailableUserDay[]>) => (this.timeBandAvailableUserDays = res.body || []))
  }

  ngOnInit(): void {
    this.loadAll()
    this.registerChangeInTimeBandAvailableUserDays()
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber)
    }
  }

  trackId(index: number, item: ITimeBandAvailableUserDay): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!
  }

  registerChangeInTimeBandAvailableUserDays(): void {
    this.eventSubscriber = this.eventManager.subscribe("timeBandAvailableUserDayListModification", () => this.loadAll())
  }

  delete(timeBandAvailableUserDay: ITimeBandAvailableUserDay): void {
    const modalRef = this.modalService.open(TimeBandAvailableUserDayDeleteDialogComponent, { size: "lg", backdrop: "static" })
    modalRef.componentInstance.timeBandAvailableUserDay = timeBandAvailableUserDay
  }
}
