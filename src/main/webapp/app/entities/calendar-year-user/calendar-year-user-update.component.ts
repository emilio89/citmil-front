import { Component, OnInit } from "@angular/core"
import { HttpResponse } from "@angular/common/http"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from "@angular/forms"
import { ActivatedRoute } from "@angular/router"
import { Observable } from "rxjs"
import * as moment from "moment"
import { DATE_TIME_FORMAT } from "app/shared/constants/input.constants"

import { ICalendarYearUser, CalendarYearUser } from "app/shared/model/calendar-year-user.model"
import { CalendarYearUserService } from "./calendar-year-user.service"
import { ICompany } from "app/shared/model/company.model"
import { CompanyService } from "app/entities/company/company.service"
import { ITimeBandAvailableUserDay } from "app/shared/model/time-band-available-user-day.model"
import { TimeBandAvailableUserDayService } from "app/entities/time-band-available-user-day/time-band-available-user-day.service"

type SelectableEntity = ICompany | ITimeBandAvailableUserDay

@Component({
  selector: "jhi-calendar-year-user-update",
  templateUrl: "./calendar-year-user-update.component.html"
})
export class CalendarYearUserUpdateComponent implements OnInit {
  isSaving = false
  companies: ICompany[] = []
  timebandavailableuserdays: ITimeBandAvailableUserDay[] = []
  dayDp: any

  editForm = this.fb.group({
    id: [],
    day: [],
    year: [],
    isPublicHoliday: [],
    start: [],
    end: [],
    companyId: [],
    timeBandAvailableUserDayId: []
  })

  constructor(
    protected calendarYearUserService: CalendarYearUserService,
    protected companyService: CompanyService,
    protected timeBandAvailableUserDayService: TimeBandAvailableUserDayService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ calendarYearUser }) => {
      if (!calendarYearUser.id) {
        const today = moment().startOf("day")
        calendarYearUser.start = today
        calendarYearUser.end = today
      }

      this.updateForm(calendarYearUser)

      this.companyService.query().subscribe((res: HttpResponse<ICompany[]>) => (this.companies = res.body || []))

      this.timeBandAvailableUserDayService.query().subscribe((res: HttpResponse<ITimeBandAvailableUserDay[]>) => (this.timebandavailableuserdays = res.body || []))
    })
  }

  updateForm(calendarYearUser: ICalendarYearUser): void {
    this.editForm.patchValue({
      id: calendarYearUser.id,
      day: calendarYearUser.day,
      year: calendarYearUser.year,
      isPublicHoliday: calendarYearUser.isPublicHoliday,
      start: calendarYearUser.start ? calendarYearUser.start.format(DATE_TIME_FORMAT) : null,
      end: calendarYearUser.end ? calendarYearUser.end.format(DATE_TIME_FORMAT) : null,
      companyId: calendarYearUser.companyId,
      timeBandAvailableUserDayId: calendarYearUser.timeBandAvailableUserDayId
    })
  }

  previousState(): void {
    window.history.back()
  }

  save(): void {
    this.isSaving = true
    const calendarYearUser = this.createFromForm()
    if (calendarYearUser.id !== undefined) {
      this.subscribeToSaveResponse(this.calendarYearUserService.update(calendarYearUser))
    } else {
      this.subscribeToSaveResponse(this.calendarYearUserService.create(calendarYearUser))
    }
  }

  private createFromForm(): ICalendarYearUser {
    return {
      ...new CalendarYearUser(),
      id: this.editForm.get(["id"])!.value,
      day: this.editForm.get(["day"])!.value,
      year: this.editForm.get(["year"])!.value,
      isPublicHoliday: this.editForm.get(["isPublicHoliday"])!.value,
      start: this.editForm.get(["start"])!.value ? moment(this.editForm.get(["start"])!.value, DATE_TIME_FORMAT) : undefined,
      end: this.editForm.get(["end"])!.value ? moment(this.editForm.get(["end"])!.value, DATE_TIME_FORMAT) : undefined,
      companyId: this.editForm.get(["companyId"])!.value,
      timeBandAvailableUserDayId: this.editForm.get(["timeBandAvailableUserDayId"])!.value
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICalendarYearUser>>): void {
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
}
