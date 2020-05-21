import { Component, OnInit } from "@angular/core"
import { HttpResponse } from "@angular/common/http"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from "@angular/forms"
import { ActivatedRoute } from "@angular/router"
import { Observable } from "rxjs"
import * as moment from "moment"
import { DATE_TIME_FORMAT } from "app/shared/constants/input.constants"

import { ICalendarYearProfesional, CalendarYearProfesional } from "app/shared/model/calendar-year-profesional.model"
import { CalendarYearProfesionalService } from "./calendar-year-profesional.service"
import { ICompany } from "app/shared/model/company.model"
import { CompanyService } from "app/entities/company/company.service"
import { ITimeBandAvailableProfesionalDay } from "app/shared/model/time-band-available-profesional-day.model"
import { TimeBandAvailableProfesionalDayService } from "app/entities/time-band-available-profesional-day/time-band-available-profesional-day.service"

type SelectableEntity = ICompany | ITimeBandAvailableProfesionalDay

@Component({
  selector: "jhi-calendar-year-profesional-update",
  templateUrl: "./calendar-year-profesional-update.component.html"
})
export class CalendarYearProfesionalUpdateComponent implements OnInit {
  isSaving = false
  companies: ICompany[] = []
  timebandavailableprofesionaldays: ITimeBandAvailableProfesionalDay[] = []
  dayDp: any

  editForm = this.fb.group({
    id: [],
    day: [],
    year: [],
    isPublicHoliday: [],
    start: [],
    end: [],
    companyId: [],
    timeBandAvailableProfesionalDayId: []
  })

  constructor(
    protected calendarYearProfesionalService: CalendarYearProfesionalService,
    protected companyService: CompanyService,
    protected timeBandAvailableProfesionalDayService: TimeBandAvailableProfesionalDayService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ calendarYearProfesional }) => {
      if (!calendarYearProfesional.id) {
        const today = moment().startOf("day")
        calendarYearProfesional.start = today
        calendarYearProfesional.end = today
      }

      this.updateForm(calendarYearProfesional)

      this.companyService.query().subscribe((res: HttpResponse<ICompany[]>) => (this.companies = res.body || []))

      this.timeBandAvailableProfesionalDayService
        .query()
        .subscribe((res: HttpResponse<ITimeBandAvailableProfesionalDay[]>) => (this.timebandavailableprofesionaldays = res.body || []))
    })
  }

  updateForm(calendarYearProfesional: ICalendarYearProfesional): void {
    this.editForm.patchValue({
      id: calendarYearProfesional.id,
      day: calendarYearProfesional.day,
      year: calendarYearProfesional.year,
      isPublicHoliday: calendarYearProfesional.isPublicHoliday,
      start: calendarYearProfesional.start ? calendarYearProfesional.start.format(DATE_TIME_FORMAT) : null,
      end: calendarYearProfesional.end ? calendarYearProfesional.end.format(DATE_TIME_FORMAT) : null,
      companyId: calendarYearProfesional.companyId,
      timeBandAvailableProfesionalDayId: calendarYearProfesional.timeBandAvailableProfesionalDayId
    })
  }

  previousState(): void {
    window.history.back()
  }

  save(): void {
    this.isSaving = true
    const calendarYearProfesional = this.createFromForm()
    if (calendarYearProfesional.id !== undefined) {
      this.subscribeToSaveResponse(this.calendarYearProfesionalService.update(calendarYearProfesional))
    } else {
      this.subscribeToSaveResponse(this.calendarYearProfesionalService.create(calendarYearProfesional))
    }
  }

  private createFromForm(): ICalendarYearProfesional {
    return {
      ...new CalendarYearProfesional(),
      id: this.editForm.get(["id"])!.value,
      day: this.editForm.get(["day"])!.value,
      year: this.editForm.get(["year"])!.value,
      isPublicHoliday: this.editForm.get(["isPublicHoliday"])!.value,
      start: this.editForm.get(["start"])!.value ? moment(this.editForm.get(["start"])!.value, DATE_TIME_FORMAT) : undefined,
      end: this.editForm.get(["end"])!.value ? moment(this.editForm.get(["end"])!.value, DATE_TIME_FORMAT) : undefined,
      companyId: this.editForm.get(["companyId"])!.value,
      timeBandAvailableProfesionalDayId: this.editForm.get(["timeBandAvailableProfesionalDayId"])!.value
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICalendarYearProfesional>>): void {
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
