import { Component, OnInit } from "@angular/core"
import { HttpResponse } from "@angular/common/http"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from "@angular/forms"
import { ActivatedRoute } from "@angular/router"
import { Observable } from "rxjs"
import * as moment from "moment"
import { DATE_TIME_FORMAT } from "app/shared/constants/input.constants"

import { ITimeBand, TimeBand } from "app/shared/model/time-band.model"
import { TimeBandService } from "./time-band.service"
import { ICalendarYearProfesional } from "app/shared/model/calendar-year-profesional.model"
import { CalendarYearProfesionalService } from "app/entities/calendar-year-profesional/calendar-year-profesional.service"
import { ICompany } from "app/shared/model/company.model"
import { CompanyService } from "app/entities/company/company.service"

type SelectableEntity = ICalendarYearProfesional | ICompany

@Component({
  selector: "jhi-time-band-update",
  templateUrl: "./time-band-update.component.html"
})
export class TimeBandUpdateComponent implements OnInit {
  isSaving = false
  calendaryearprofesionals: ICalendarYearProfesional[] = []
  companies: ICompany[] = []

  editForm = this.fb.group({
    id: [],
    start: [],
    end: [],
    calendarYearProfesionals: [],
    companyId: []
  })

  constructor(
    protected timeBandService: TimeBandService,
    protected calendarYearProfesionalService: CalendarYearProfesionalService,
    protected companyService: CompanyService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ timeBand }) => {
      if (!timeBand.id) {
        const today = moment().startOf("day")
        timeBand.start = today
        timeBand.end = today
      }

      this.updateForm(timeBand)

      this.calendarYearProfesionalService.query().subscribe((res: HttpResponse<ICalendarYearProfesional[]>) => (this.calendaryearprofesionals = res.body || []))

      this.companyService.query().subscribe((res: HttpResponse<ICompany[]>) => (this.companies = res.body || []))
    })
  }

  updateForm(timeBand: ITimeBand): void {
    this.editForm.patchValue({
      id: timeBand.id,
      start: timeBand.start ? timeBand.start.format(DATE_TIME_FORMAT) : null,
      end: timeBand.end ? timeBand.end.format(DATE_TIME_FORMAT) : null,
      calendarYearProfesionals: timeBand.calendarYearProfesionals,
      companyId: timeBand.companyId
    })
  }

  previousState(): void {
    window.history.back()
  }

  save(): void {
    this.isSaving = true
    const timeBand = this.createFromForm()
    if (timeBand.id !== undefined) {
      this.subscribeToSaveResponse(this.timeBandService.update(timeBand))
    } else {
      this.subscribeToSaveResponse(this.timeBandService.create(timeBand))
    }
  }

  private createFromForm(): ITimeBand {
    return {
      ...new TimeBand(),
      id: this.editForm.get(["id"])!.value,
      start: this.editForm.get(["start"])!.value ? moment(this.editForm.get(["start"])!.value, DATE_TIME_FORMAT) : undefined,
      end: this.editForm.get(["end"])!.value ? moment(this.editForm.get(["end"])!.value, DATE_TIME_FORMAT) : undefined,
      calendarYearProfesionals: this.editForm.get(["calendarYearProfesionals"])!.value,
      companyId: this.editForm.get(["companyId"])!.value
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITimeBand>>): void {
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

  getSelected(selectedVals: ICalendarYearProfesional[], option: ICalendarYearProfesional): ICalendarYearProfesional {
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
