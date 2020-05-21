import { Component, OnInit, ElementRef } from "@angular/core"
import { HttpResponse } from "@angular/common/http"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from "@angular/forms"
import { ActivatedRoute } from "@angular/router"
import { Observable } from "rxjs"
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from "ng-jhipster"

import { IUserExtra, UserExtra } from "app/shared/model/user-extra.model"
import { UserExtraService } from "./user-extra.service"
import { AlertError } from "app/shared/alert/alert-error.model"
import { IUser } from "app/core/user/user.model"
import { UserService } from "app/core/user/user.service"
import { ITypeService } from "app/shared/model/type-service.model"
import { TypeServiceService } from "app/entities/type-service/type-service.service"
import { ICalendarYearUser } from "app/shared/model/calendar-year-user.model"
import { CalendarYearUserService } from "app/entities/calendar-year-user/calendar-year-user.service"
import { ICompany } from "app/shared/model/company.model"
import { CompanyService } from "app/entities/company/company.service"
import { ITimeBandAvailableUserDay } from "app/shared/model/time-band-available-user-day.model"
import { TimeBandAvailableUserDayService } from "app/entities/time-band-available-user-day/time-band-available-user-day.service"

type SelectableEntity = IUser | ITypeService | ICalendarYearUser | ICompany | ITimeBandAvailableUserDay

@Component({
  selector: "jhi-user-extra-update",
  templateUrl: "./user-extra-update.component.html"
})
export class UserExtraUpdateComponent implements OnInit {
  isSaving = false
  users: IUser[] = []
  typeservices: ITypeService[] = []
  calendaryearusers: ICalendarYearUser[] = []
  companies: ICompany[] = []
  timebandavailableuserdays: ITimeBandAvailableUserDay[] = []
  birthdateDp: any

  editForm = this.fb.group({
    id: [],
    description: [],
    address: [null, [Validators.maxLength(255)]],
    phone: [null, [Validators.maxLength(20)]],
    birthdate: [],
    urlImg: [],
    urlImgContentType: [],
    actived: [],
    deleted: [],
    userId: [],
    typeServices: [],
    calendarYearUserId: [],
    companyId: [],
    timeBandAvailableUserDayId: []
  })

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected userExtraService: UserExtraService,
    protected userService: UserService,
    protected typeServiceService: TypeServiceService,
    protected calendarYearUserService: CalendarYearUserService,
    protected companyService: CompanyService,
    protected timeBandAvailableUserDayService: TimeBandAvailableUserDayService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ userExtra }) => {
      this.updateForm(userExtra)

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []))

      this.typeServiceService.query().subscribe((res: HttpResponse<ITypeService[]>) => (this.typeservices = res.body || []))

      this.calendarYearUserService.query().subscribe((res: HttpResponse<ICalendarYearUser[]>) => (this.calendaryearusers = res.body || []))

      this.companyService.query().subscribe((res: HttpResponse<ICompany[]>) => (this.companies = res.body || []))

      this.timeBandAvailableUserDayService.query().subscribe((res: HttpResponse<ITimeBandAvailableUserDay[]>) => (this.timebandavailableuserdays = res.body || []))
    })
  }

  updateForm(userExtra: IUserExtra): void {
    this.editForm.patchValue({
      id: userExtra.id,
      description: userExtra.description,
      address: userExtra.address,
      phone: userExtra.phone,
      birthdate: userExtra.birthdate,
      urlImg: userExtra.urlImg,
      urlImgContentType: userExtra.urlImgContentType,
      actived: userExtra.actived,
      deleted: userExtra.deleted,
      userId: userExtra.userId,
      typeServices: userExtra.typeServices,
      calendarYearUserId: userExtra.calendarYearUserId,
      companyId: userExtra.companyId,
      timeBandAvailableUserDayId: userExtra.timeBandAvailableUserDayId
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
    const userExtra = this.createFromForm()
    if (userExtra.id !== undefined) {
      this.subscribeToSaveResponse(this.userExtraService.update(userExtra))
    } else {
      this.subscribeToSaveResponse(this.userExtraService.create(userExtra))
    }
  }

  private createFromForm(): IUserExtra {
    return {
      ...new UserExtra(),
      id: this.editForm.get(["id"])!.value,
      description: this.editForm.get(["description"])!.value,
      address: this.editForm.get(["address"])!.value,
      phone: this.editForm.get(["phone"])!.value,
      birthdate: this.editForm.get(["birthdate"])!.value,
      urlImgContentType: this.editForm.get(["urlImgContentType"])!.value,
      urlImg: this.editForm.get(["urlImg"])!.value,
      actived: this.editForm.get(["actived"])!.value,
      deleted: this.editForm.get(["deleted"])!.value,
      userId: this.editForm.get(["userId"])!.value,
      typeServices: this.editForm.get(["typeServices"])!.value,
      calendarYearUserId: this.editForm.get(["calendarYearUserId"])!.value,
      companyId: this.editForm.get(["companyId"])!.value,
      timeBandAvailableUserDayId: this.editForm.get(["timeBandAvailableUserDayId"])!.value
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUserExtra>>): void {
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
