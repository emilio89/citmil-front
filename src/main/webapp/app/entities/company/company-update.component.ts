import { Component, OnInit, ElementRef } from "@angular/core"
import { HttpResponse } from "@angular/common/http"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from "@angular/forms"
import { ActivatedRoute } from "@angular/router"
import { Observable } from "rxjs"
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from "ng-jhipster"

import { ICompany, Company } from "app/shared/model/company.model"
import { CompanyService } from "./company.service"
import { AlertError } from "app/shared/alert/alert-error.model"

@Component({
  selector: "jhi-company-update",
  templateUrl: "./company-update.component.html"
})
export class CompanyUpdateComponent implements OnInit {
  isSaving = false

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required, Validators.maxLength(255)]],
    description: [null, [Validators.required]],
    primaryColor: [null, [Validators.maxLength(10)]],
    secondaryColor: [null, [Validators.maxLength(10)]],
    urlImg: [],
    urlImgContentType: [],
    email: [null, [Validators.required, Validators.maxLength(150)]],
    phone: [null, [Validators.required, Validators.maxLength(10)]],
    maxDayAppointment: [],
    minDayAppointment: [],
    lat: [],
    lng: []
  })

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected companyService: CompanyService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ company }) => {
      this.updateForm(company)
    })
  }

  updateForm(company: ICompany): void {
    this.editForm.patchValue({
      id: company.id,
      name: company.name,
      description: company.description,
      primaryColor: company.primaryColor,
      secondaryColor: company.secondaryColor,
      urlImg: company.urlImg,
      urlImgContentType: company.urlImgContentType,
      email: company.email,
      phone: company.phone,
      maxDayAppointment: company.maxDayAppointment,
      minDayAppointment: company.minDayAppointment,
      lat: company.lat,
      lng: company.lng
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
    const company = this.createFromForm()
    if (company.id !== undefined) {
      this.subscribeToSaveResponse(this.companyService.update(company))
    } else {
      this.subscribeToSaveResponse(this.companyService.create(company))
    }
  }

  private createFromForm(): ICompany {
    return {
      ...new Company(),
      id: this.editForm.get(["id"])!.value,
      name: this.editForm.get(["name"])!.value,
      description: this.editForm.get(["description"])!.value,
      primaryColor: this.editForm.get(["primaryColor"])!.value,
      secondaryColor: this.editForm.get(["secondaryColor"])!.value,
      urlImgContentType: this.editForm.get(["urlImgContentType"])!.value,
      urlImg: this.editForm.get(["urlImg"])!.value,
      email: this.editForm.get(["email"])!.value,
      phone: this.editForm.get(["phone"])!.value,
      maxDayAppointment: this.editForm.get(["maxDayAppointment"])!.value,
      minDayAppointment: this.editForm.get(["minDayAppointment"])!.value,
      lat: this.editForm.get(["lat"])!.value,
      lng: this.editForm.get(["lng"])!.value
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICompany>>): void {
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
}
