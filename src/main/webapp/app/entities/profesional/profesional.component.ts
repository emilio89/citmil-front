import { Component, OnInit, OnDestroy } from "@angular/core"
import { HttpHeaders, HttpResponse } from "@angular/common/http"
import { ActivatedRoute, Router } from "@angular/router"
import { Subscription } from "rxjs"
import { JhiEventManager, JhiDataUtils } from "ng-jhipster"
import { NgbModal } from "@ng-bootstrap/ng-bootstrap"

import { IProfesional } from "app/shared/model/profesional.model"

import { ITEMS_PER_PAGE } from "app/shared/constants/pagination.constants"
import { ProfesionalService } from "./profesional.service"
import { ProfesionalDeleteDialogComponent } from "./profesional-delete-dialog.component"

@Component({
  selector: "jhi-profesional",
  templateUrl: "./profesional.component.html"
})
export class ProfesionalComponent implements OnInit, OnDestroy {
  profesionals?: IProfesional[]
  eventSubscriber?: Subscription
  totalItems = 0
  itemsPerPage = ITEMS_PER_PAGE
  page!: number
  predicate!: string
  ascending!: boolean
  ngbPaginationPage = 1

  constructor(
    protected profesionalService: ProfesionalService,
    protected activatedRoute: ActivatedRoute,
    protected dataUtils: JhiDataUtils,
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadPage(page?: number): void {
    const pageToLoad: number = page || this.page

    this.profesionalService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe(
        (res: HttpResponse<IProfesional[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
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
    this.registerChangeInProfesionals()
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber)
    }
  }

  trackId(index: number, item: IProfesional): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String)
  }

  openFile(contentType: string, base64String: string): void {
    return this.dataUtils.openFile(contentType, base64String)
  }

  registerChangeInProfesionals(): void {
    this.eventSubscriber = this.eventManager.subscribe("profesionalListModification", () => this.loadPage())
  }

  delete(profesional: IProfesional): void {
    const modalRef = this.modalService.open(ProfesionalDeleteDialogComponent, { size: "lg", backdrop: "static" })
    modalRef.componentInstance.profesional = profesional
  }

  sort(): string[] {
    const result = [this.predicate + "," + (this.ascending ? "asc" : "desc")]
    if (this.predicate !== "id") {
      result.push("id")
    }
    return result
  }

  protected onSuccess(data: IProfesional[] | null, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get("X-Total-Count"))
    this.page = page
    this.router.navigate(["/profesional"], {
      queryParams: {
        page: this.page,
        size: this.itemsPerPage,
        sort: this.predicate + "," + (this.ascending ? "asc" : "desc")
      }
    })
    this.profesionals = data || []
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page
  }
}
