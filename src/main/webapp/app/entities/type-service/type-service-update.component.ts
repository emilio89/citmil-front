import { Component, OnInit, ElementRef } from "@angular/core"
import { HttpResponse } from "@angular/common/http"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from "@angular/forms"
import { ActivatedRoute } from "@angular/router"
import { Observable } from "rxjs"
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from "ng-jhipster"

import { ITypeService, TypeService } from "app/shared/model/type-service.model"
import { TypeServiceService } from "./type-service.service"
import { AlertError } from "app/shared/alert/alert-error.model"
import { ICompany } from "app/shared/model/company.model"
import { CompanyService } from "app/entities/company/company.service"

@Component({
  selector: "jhi-type-service-update",
  templateUrl: "./type-service-update.component.html"
})
export class TypeServiceUpdateComponent implements OnInit {
  isSaving = false
  companies: ICompany[] = []

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required, Validators.maxLength(200)]],
    description: [],
    durationMinutes: [null, [Validators.required]],
    maxDayAppointment: [],
    minDayAppointment: [],
    price: [],
    icon: [],
    iconContentType: [],
    actived: [],
    companyId: []
  })

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected typeServiceService: TypeServiceService,
    protected companyService: CompanyService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ typeService }) => {
      this.updateForm(typeService)

      this.companyService.query().subscribe((res: HttpResponse<ICompany[]>) => (this.companies = res.body || []))
    })
  }

  updateForm(typeService: ITypeService): void {
    this.editForm.patchValue({
      id: typeService.id,
      name: typeService.name,
      description: typeService.description,
      durationMinutes: typeService.durationMinutes,
      maxDayAppointment: typeService.maxDayAppointment,
      minDayAppointment: typeService.minDayAppointment,
      price: typeService.price,
      icon: typeService.icon,
      iconContentType: typeService.iconContentType,
      actived: typeService.actived,
      companyId: typeService.companyId
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
    const typeService = this.createFromForm()
    if (typeService.id !== undefined) {
      this.subscribeToSaveResponse(this.typeServiceService.update(typeService))
    } else {
      this.subscribeToSaveResponse(this.typeServiceService.create(typeService))
    }
  }

  private createFromForm(): ITypeService {
    return {
      ...new TypeService(),
      id: this.editForm.get(["id"])!.value,
      name: this.editForm.get(["name"])!.value,
      description: this.editForm.get(["description"])!.value,
      durationMinutes: this.editForm.get(["durationMinutes"])!.value,
      maxDayAppointment: this.editForm.get(["maxDayAppointment"])!.value,
      minDayAppointment: this.editForm.get(["minDayAppointment"])!.value,
      price: this.editForm.get(["price"])!.value,
      iconContentType: this.editForm.get(["iconContentType"])!.value,
      icon: this.editForm.get(["icon"])!.value,
      actived: this.editForm.get(["actived"])!.value,
      companyId: this.editForm.get(["companyId"])!.value
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITypeService>>): void {
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
