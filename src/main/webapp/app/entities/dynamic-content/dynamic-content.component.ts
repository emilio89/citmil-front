import { Component, OnInit, OnDestroy } from "@angular/core"
import { HttpHeaders, HttpResponse } from "@angular/common/http"
import { ActivatedRoute, Router } from "@angular/router"
import { Subscription } from "rxjs"
import { JhiEventManager, JhiDataUtils } from "ng-jhipster"
import { NgbModal } from "@ng-bootstrap/ng-bootstrap"

import { IDynamicContent } from "app/shared/model/dynamic-content.model"

import { ITEMS_PER_PAGE } from "app/shared/constants/pagination.constants"
import { DynamicContentService } from "./dynamic-content.service"
import { DynamicContentDeleteDialogComponent } from "./dynamic-content-delete-dialog.component"

@Component({
  selector: "jhi-dynamic-content",
  templateUrl: "./dynamic-content.component.html"
})
export class DynamicContentComponent implements OnInit, OnDestroy {
  dynamicContents?: IDynamicContent[]
  eventSubscriber?: Subscription
  totalItems = 0
  itemsPerPage = ITEMS_PER_PAGE
  page!: number
  predicate!: string
  ascending!: boolean
  ngbPaginationPage = 1

  constructor(
    protected dynamicContentService: DynamicContentService,
    protected activatedRoute: ActivatedRoute,
    protected dataUtils: JhiDataUtils,
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadPage(page?: number): void {
    const pageToLoad: number = page || this.page

    this.dynamicContentService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe(
        (res: HttpResponse<IDynamicContent[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
        () => this.onError()
      )
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.page = data.pagingParams.page
      this.ascending = data.pagingParams.ascending
      this.predicate = data.pagingParams.predicate
      this.ngbPaginationPage = data.pagingParams.page
      this.loadPage()
    })
    this.registerChangeInDynamicContents()
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber)
    }
  }

  trackId(index: number, item: IDynamicContent): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String)
  }

  openFile(contentType: string, base64String: string): void {
    return this.dataUtils.openFile(contentType, base64String)
  }

  registerChangeInDynamicContents(): void {
    this.eventSubscriber = this.eventManager.subscribe("dynamicContentListModification", () => this.loadPage())
  }

  delete(dynamicContent: IDynamicContent): void {
    const modalRef = this.modalService.open(DynamicContentDeleteDialogComponent, { size: "lg", backdrop: "static" })
    modalRef.componentInstance.dynamicContent = dynamicContent
  }

  sort(): string[] {
    const result = [this.predicate + "," + (this.ascending ? "asc" : "desc")]
    if (this.predicate !== "id") {
      result.push("id")
    }
    return result
  }

  protected onSuccess(data: IDynamicContent[] | null, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get("X-Total-Count"))
    this.page = page
    this.router.navigate(["/dynamic-content"], {
      queryParams: {
        page: this.page,
        size: this.itemsPerPage,
        sort: this.predicate + "," + (this.ascending ? "asc" : "desc")
      }
    })
    this.dynamicContents = data || []
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page
  }
}
