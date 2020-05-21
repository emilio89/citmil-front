import { Component, OnInit, OnDestroy } from "@angular/core"
import { HttpResponse } from "@angular/common/http"
import { Subscription } from "rxjs"
import { JhiEventManager } from "ng-jhipster"
import { NgbModal } from "@ng-bootstrap/ng-bootstrap"

import { IPublicHoliday } from "app/shared/model/public-holiday.model"
import { PublicHolidayService } from "./public-holiday.service"
import { PublicHolidayDeleteDialogComponent } from "./public-holiday-delete-dialog.component"

@Component({
  selector: "jhi-public-holiday",
  templateUrl: "./public-holiday.component.html"
})
export class PublicHolidayComponent implements OnInit, OnDestroy {
  publicHolidays?: IPublicHoliday[]
  eventSubscriber?: Subscription

  constructor(protected publicHolidayService: PublicHolidayService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.publicHolidayService.query().subscribe((res: HttpResponse<IPublicHoliday[]>) => (this.publicHolidays = res.body || []))
  }

  ngOnInit(): void {
    this.loadAll()
    this.registerChangeInPublicHolidays()
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber)
    }
  }

  trackId(index: number, item: IPublicHoliday): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!
  }

  registerChangeInPublicHolidays(): void {
    this.eventSubscriber = this.eventManager.subscribe("publicHolidayListModification", () => this.loadAll())
  }

  delete(publicHoliday: IPublicHoliday): void {
    const modalRef = this.modalService.open(PublicHolidayDeleteDialogComponent, { size: "lg", backdrop: "static" })
    modalRef.componentInstance.publicHoliday = publicHoliday
  }
}
