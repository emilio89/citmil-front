import { Component, OnInit, ElementRef } from "@angular/core"
import { HttpResponse } from "@angular/common/http"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from "@angular/forms"
import { ActivatedRoute } from "@angular/router"
import { Observable } from "rxjs"
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from "ng-jhipster"

import { IMenuOptionsAvailable, MenuOptionsAvailable } from "app/shared/model/menu-options-available.model"
import { MenuOptionsAvailableService } from "./menu-options-available.service"
import { AlertError } from "app/shared/alert/alert-error.model"
import { ICompany } from "app/shared/model/company.model"
import { CompanyService } from "app/entities/company/company.service"

@Component({
  selector: "jhi-menu-options-available-update",
  templateUrl: "./menu-options-available-update.component.html"
})
export class MenuOptionsAvailableUpdateComponent implements OnInit {
  isSaving = false
  companies: ICompany[] = []

  editForm = this.fb.group({
    id: [],
    title: [],
    description: [],
    urlImg: [],
    urlImgContentType: [],
    actived: [],
    companyId: []
  })

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected menuOptionsAvailableService: MenuOptionsAvailableService,
    protected companyService: CompanyService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ menuOptionsAvailable }) => {
      this.updateForm(menuOptionsAvailable)

      this.companyService.query().subscribe((res: HttpResponse<ICompany[]>) => (this.companies = res.body || []))
    })
  }

  updateForm(menuOptionsAvailable: IMenuOptionsAvailable): void {
    this.editForm.patchValue({
      id: menuOptionsAvailable.id,
      title: menuOptionsAvailable.title,
      description: menuOptionsAvailable.description,
      urlImg: menuOptionsAvailable.urlImg,
      urlImgContentType: menuOptionsAvailable.urlImgContentType,
      actived: menuOptionsAvailable.actived,
      companyId: menuOptionsAvailable.companyId
    })
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String)
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String)
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe(null, (err: JhiFileLoadError) => {
      this.eventManager.broadcast(
        new JhiEventWithContent<AlertError>("citmilApp.error", { ...err, key: "error.file." + err.key })
      )
    })
  }

  clearInputImage(field: string, fieldContentType: string, idInput: string): void {
    this.editForm.patchValue({
      [field]: null,
      [fieldContentType]: null
    })
    if (this.elementRef && idInput && this.elementRef.nativeElement.querySelector("#" + idInput)) {
      this.elementRef.nativeElement.querySelector("#" + idInput).value = null
    }
  }

  previousState(): void {
    window.history.back()
  }

  save(): void {
    this.isSaving = true
    const menuOptionsAvailable = this.createFromForm()
    if (menuOptionsAvailable.id !== undefined) {
      this.subscribeToSaveResponse(this.menuOptionsAvailableService.update(menuOptionsAvailable))
    } else {
      this.subscribeToSaveResponse(this.menuOptionsAvailableService.create(menuOptionsAvailable))
    }
  }

  private createFromForm(): IMenuOptionsAvailable {
    return {
      ...new MenuOptionsAvailable(),
      id: this.editForm.get(["id"])!.value,
      title: this.editForm.get(["title"])!.value,
      description: this.editForm.get(["description"])!.value,
      urlImgContentType: this.editForm.get(["urlImgContentType"])!.value,
      urlImg: this.editForm.get(["urlImg"])!.value,
      actived: this.editForm.get(["actived"])!.value,
      companyId: this.editForm.get(["companyId"])!.value
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMenuOptionsAvailable>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    )
  }

  protected onSaveSuccess(): void {
    this.isSaving = false
    this.previousState()
  }

  protected onSaveError(): void {
    this.isSaving = false
  }

  trackById(index: number, item: ICompany): any {
    return item.id
  }
}
