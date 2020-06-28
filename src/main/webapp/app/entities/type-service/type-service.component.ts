import { Component, OnInit, OnDestroy } from "@angular/core"
import { HttpHeaders, HttpResponse } from "@angular/common/http"
import { ActivatedRoute, Router } from "@angular/router"
import { Subscription } from "rxjs"
import { JhiEventManager, JhiDataUtils } from "ng-jhipster"
import { NgbModal } from "@ng-bootstrap/ng-bootstrap"

import { ITypeService } from "app/shared/model/type-service.model"

import { ITEMS_PER_PAGE } from "app/shared/constants/pagination.constants"
import { TypeServiceService } from "./type-service.service"
import { TypeServiceDeleteDialogComponent } from "./type-service-delete-dialog.component"

@Component({
  selector: "jhi-type-service",
  templateUrl: "./type-service.component.html"
})
export class TypeServiceComponent implements OnInit, OnDestroy {
  typeServices?: ITypeService[]
  eventSubscriber?: Subscription
  totalItems = 0
  itemsPerPage = ITEMS_PER_PAGE
  page!: number
  predicate!: string
  ascending!: boolean
  ngbPaginationPage = 1

  constructor(
    protected typeServiceService: TypeServiceService,
    protected activatedRoute: ActivatedRoute,
    protected dataUtils: JhiDataUtils,
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadPage(page?: number): void {
    const pageToLoad: number = page || this.page
    this.typeServiceService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe(
        (res: HttpResponse<ITypeService[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
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
    this.registerChangeInTypeServices()
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber)
    }
  }

  trackId(index: number, item: ITypeService): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String)
  }

  openFile(contentType: string, base64String: string): void {
    return this.dataUtils.openFile(contentType, base64String)
  }

  registerChangeInTypeServices(): void {
    this.eventSubscriber = this.eventManager.subscribe("typeServiceListModification", () => this.loadPage())
  }

  delete(typeService: ITypeService): void {
    const modalRef = this.modalService.open(TypeServiceDeleteDialogComponent, { size: "lg", backdrop: "static" })
    modalRef.componentInstance.typeService = typeService
  }

  sort(): string[] {
    const result = [this.predicate + "," + (this.ascending ? "asc" : "desc")]
    if (this.predicate !== "id") {
      result.push("id")
    }
    return result
  }

  protected onSuccess(data: ITypeService[] | null, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get("X-Total-Count"))
    this.page = page
    this.router.navigate(["/type-service"], {
      queryParams: {
        page: this.page,
        size: this.itemsPerPage,
        sort: this.predicate + "," + (this.ascending ? "asc" : "desc")
      }
    })
    this.typeServices = data || []
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page
  }
}
