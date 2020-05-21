import { Component, OnInit, OnDestroy } from "@angular/core"
import { HttpResponse } from "@angular/common/http"
import { Subscription } from "rxjs"
import { JhiEventManager, JhiDataUtils } from "ng-jhipster"
import { NgbModal } from "@ng-bootstrap/ng-bootstrap"

import { IMenuOptionsAvailable } from "app/shared/model/menu-options-available.model"
import { MenuOptionsAvailableService } from "./menu-options-available.service"
import { MenuOptionsAvailableDeleteDialogComponent } from "./menu-options-available-delete-dialog.component"

@Component({
  selector: "jhi-menu-options-available",
  templateUrl: "./menu-options-available.component.html"
})
export class MenuOptionsAvailableComponent implements OnInit, OnDestroy {
  menuOptionsAvailables?: IMenuOptionsAvailable[]
  eventSubscriber?: Subscription

  constructor(
    protected menuOptionsAvailableService: MenuOptionsAvailableService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.menuOptionsAvailableService.query().subscribe((res: HttpResponse<IMenuOptionsAvailable[]>) => (this.menuOptionsAvailables = res.body || []))
  }

  ngOnInit(): void {
    this.loadAll()
    this.registerChangeInMenuOptionsAvailables()
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber)
    }
  }

  trackId(index: number, item: IMenuOptionsAvailable): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String)
  }

  openFile(contentType: string, base64String: string): void {
    return this.dataUtils.openFile(contentType, base64String)
  }

  registerChangeInMenuOptionsAvailables(): void {
    this.eventSubscriber = this.eventManager.subscribe("menuOptionsAvailableListModification", () => this.loadAll())
  }

  delete(menuOptionsAvailable: IMenuOptionsAvailable): void {
    const modalRef = this.modalService.open(MenuOptionsAvailableDeleteDialogComponent, { size: "lg", backdrop: "static" })
    modalRef.componentInstance.menuOptionsAvailable = menuOptionsAvailable
  }
}
