import { Component, OnInit, OnDestroy } from "@angular/core"
import { HttpResponse } from "@angular/common/http"
import { Subscription } from "rxjs"
import { JhiEventManager } from "ng-jhipster"
import { NgbModal } from "@ng-bootstrap/ng-bootstrap"

import { ITimeBand } from "app/shared/model/time-band.model"
import { TimeBandService } from "./time-band.service"
import { TimeBandDeleteDialogComponent } from "./time-band-delete-dialog.component"

@Component({
  selector: "jhi-time-band",
  templateUrl: "./time-band.component.html"
})
export class TimeBandComponent implements OnInit, OnDestroy {
  timeBands?: ITimeBand[]
  eventSubscriber?: Subscription

  constructor(protected timeBandService: TimeBandService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.timeBandService.query().subscribe((res: HttpResponse<ITimeBand[]>) => (this.timeBands = res.body || []))
  }

  ngOnInit(): void {
    this.loadAll()
    this.registerChangeInTimeBands()
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber)
    }
  }

  trackId(index: number, item: ITimeBand): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!
  }

  registerChangeInTimeBands(): void {
    this.eventSubscriber = this.eventManager.subscribe("timeBandListModification", () => this.loadAll())
  }

  delete(timeBand: ITimeBand): void {
    const modalRef = this.modalService.open(TimeBandDeleteDialogComponent, { size: "lg", backdrop: "static" })
    modalRef.componentInstance.timeBand = timeBand
  }
}
