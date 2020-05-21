import { Component, OnInit, ElementRef } from "@angular/core"
import { HttpResponse } from "@angular/common/http"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from "@angular/forms"
import { ActivatedRoute } from "@angular/router"
import { Observable } from "rxjs"
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from "ng-jhipster"

import { IProfesional, Profesional } from "app/shared/model/profesional.model"
import { ProfesionalService } from "./profesional.service"
import { AlertError } from "app/shared/alert/alert-error.model"
import { ITypeService } from "app/shared/model/type-service.model"
import { TypeServiceService } from "app/entities/type-service/type-service.service"
import { ICalendarYearProfesional } from "app/shared/model/calendar-year-profesional.model"
import { CalendarYearProfesionalService } from "app/entities/calendar-year-profesional/calendar-year-profesional.service"
import { ICompany } from "app/shared/model/company.model"
import { CompanyService } from "app/entities/company/company.service"
import { ITimeBandAvailableProfesionalDay } from "app/shared/model/time-band-available-profesional-day.model"
import { TimeBandAvailableProfesionalDayService } from "app/entities/time-band-available-profesional-day/time-band-available-profesional-day.service"

type SelectableEntity = ITypeService | ICalendarYearProfesional | ICompany | ITimeBandAvailableProfesionalDay

@Component({
  selector: "jhi-profesional-update",
  templateUrl: "./profesional-update.component.html"
})
export class ProfesionalUpdateComponent implements OnInit {
  isSaving = false
  typeservices: ITypeService[] = []
  calendaryearprofesionals: ICalendarYearProfesional[] = []
  companies: ICompany[] = []
  timebandavailableprofesionaldays: ITimeBandAvailableProfesionalDay[] = []
  birthdateDp: any

  editForm = this.fb.group({
    id: [],
    firstName: [null, [Validators.required, Validators.maxLength(200)]],
    lastName: [null, [Validators.maxLength(255)]],
    description: [],
    email: [null, [Validators.maxLength(200)]],
    address: [null, [Validators.maxLength(255)]],
    phone: [null, [Validators.maxLength(20)]],
    birthdate: [],
    urlImg: [],
    urlImgContentType: [],
    actived: [],
    deleted: [],
    typeServices: [],
    calendarYearProfesionalId: [],
    companyId: [],
    timeBandAvailableProfesionalDayId: []
  })

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected profesionalService: ProfesionalService,
    protected typeServiceService: TypeServiceService,
    protected calendarYearProfesionalService: CalendarYearProfesionalService,
    protected companyService: CompanyService,
    protected timeBandAvailableProfesionalDayService: TimeBandAvailableProfesionalDayService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ profesional }) => {
      this.updateForm(profesional)

      this.typeServiceService.query().subscribe((res: HttpResponse<ITypeService[]>) => (this.typeservices = res.body || []))

      this.calendarYearProfesionalService.query().subscribe((res: HttpResponse<ICalendarYearProfesional[]>) => (this.calendaryearprofesionals = res.body || []))

      this.companyService.query().subscribe((res: HttpResponse<ICompany[]>) => (this.companies = res.body || []))

      this.timeBandAvailableProfesionalDayService
        .query()
        .subscribe((res: HttpResponse<ITimeBandAvailableProfesionalDay[]>) => (this.timebandavailableprofesionaldays = res.body || []))
    })
  }

  updateForm(profesional: IProfesional): void {
    this.editForm.patchValue({
      id: profesional.id,
      firstName: profesional.firstName,
      lastName: profesional.lastName,
      description: profesional.description,
      email: profesional.email,
      address: profesional.address,
      phone: profesional.phone,
      birthdate: profesional.birthdate,
      urlImg: profesional.urlImg,
      urlImgContentType: profesional.urlImgContentType,
      actived: profesional.actived,
      deleted: profesional.deleted,
      typeServices: profesional.typeServices,
      calendarYearProfesionalId: profesional.calendarYearProfesionalId,
      companyId: profesional.companyId,
      timeBandAvailableProfesionalDayId: profesional.timeBandAvailableProfesionalDayId
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
    const profesional = this.createFromForm()
    if (profesional.id !== undefined) {
      this.subscribeToSaveResponse(this.profesionalService.update(profesional))
    } else {
      this.subscribeToSaveResponse(this.profesionalService.create(profesional))
    }
  }

  private createFromForm(): IProfesional {
    return {
      ...new Profesional(),
      id: this.editForm.get(["id"])!.value,
      firstName: this.editForm.get(["firstName"])!.value,
      lastName: this.editForm.get(["lastName"])!.value,
      description: this.editForm.get(["description"])!.value,
      email: this.editForm.get(["email"])!.value,
      address: this.editForm.get(["address"])!.value,
      phone: this.editForm.get(["phone"])!.value,
      birthdate: this.editForm.get(["birthdate"])!.value,
      urlImgContentType: this.editForm.get(["urlImgContentType"])!.value,
      urlImg: this.editForm.get(["urlImg"])!.value,
      actived: this.editForm.get(["actived"])!.value,
      deleted: this.editForm.get(["deleted"])!.value,
      typeServices: this.editForm.get(["typeServices"])!.value,
      calendarYearProfesionalId: this.editForm.get(["calendarYearProfesionalId"])!.value,
      companyId: this.editForm.get(["companyId"])!.value,
      timeBandAvailableProfesionalDayId: this.editForm.get(["timeBandAvailableProfesionalDayId"])!.value
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProfesional>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id
  }

  getSelected(selectedVals: ITypeService[], option: ITypeService): ITypeService {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i]
        }
      }
    }
    return option
  }
}
