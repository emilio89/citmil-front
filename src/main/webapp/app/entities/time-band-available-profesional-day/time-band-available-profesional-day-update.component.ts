import { Component, OnInit } from "@angular/core"
import { HttpResponse } from "@angular/common/http"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from "@angular/forms"
import { ActivatedRoute } from "@angular/router"
import { Observable } from "rxjs"
import * as moment from "moment"
import { DATE_TIME_FORMAT } from "app/shared/constants/input.constants"

import { ITimeBandAvailableProfesionalDay, TimeBandAvailableProfesionalDay } from "app/shared/model/time-band-available-profesional-day.model"
import { TimeBandAvailableProfesionalDayService } from "./time-band-available-profesional-day.service"
import { ICompany } from "app/shared/model/company.model"
import { CompanyService } from "app/entities/company/company.service"

@Component({
  selector: "jhi-time-band-available-profesional-day-update",
  templateUrl: "./time-band-available-profesional-day-update.component.html"
})
export class TimeBandAvailableProfesionalDayUpdateComponent implements OnInit {
  isSaving = false
  companies: ICompany[] = []

  editForm = this.fb.group({
    id: [],
    year: [],
    start: [],
    end: [],
    companyId: []
  })

  constructor(
    protected timeBandAvailableProfesionalDayService: TimeBandAvailableProfesionalDayService,
    protected companyService: CompanyService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ timeBandAvailableProfesionalDay }) => {
      if (!timeBandAvailableProfesionalDay.id) {
        const today = moment().startOf("day")
        timeBandAvailableProfesionalDay.start = today
        timeBandAvailableProfesionalDay.end = today
      }

      this.updateForm(timeBandAvailableProfesionalDay)

      this.companyService.query().subscribe((res: HttpResponse<ICompany[]>) => (this.companies = res.body || []))
    })
  }

  updateForm(timeBandAvailableProfesionalDay: ITimeBandAvailableProfesionalDay): void {
    this.editForm.patchValue({
      id: timeBandAvailableProfesionalDay.id,
      year: timeBandAvailableProfesionalDay.year,
      start: timeBandAvailableProfesionalDay.start ? timeBandAvailableProfesionalDay.start.format(DATE_TIME_FORMAT) : null,
      end: timeBandAvailableProfesionalDay.end ? timeBandAvailableProfesionalDay.end.format(DATE_TIME_FORMAT) : null,
      companyId: timeBandAvailableProfesionalDay.companyId
    })
  }

  previousState(): void {
    window.history.back()
  }

  save(): void {
    this.isSaving = true
    const timeBandAvailableProfesionalDay = this.createFromForm()
    if (timeBandAvailableProfesionalDay.id !== undefined) {
      this.subscribeToSaveResponse(this.timeBandAvailableProfesionalDayService.update(timeBandAvailableProfesionalDay))
    } else {
      this.subscribeToSaveResponse(this.timeBandAvailableProfesionalDayService.create(timeBandAvailableProfesionalDay))
    }
  }

  private createFromForm(): ITimeBandAvailableProfesionalDay {
    return {
      ...new TimeBandAvailableProfesionalDay(),
      id: this.editForm.get(["id"])!.value,
      year: this.editForm.get(["year"])!.value,
      start: this.editForm.get(["start"])!.value ? moment(this.editForm.get(["start"])!.value, DATE_TIME_FORMAT) : undefined,
      end: this.editForm.get(["end"])!.value ? moment(this.editForm.get(["end"])!.value, DATE_TIME_FORMAT) : undefined,
      companyId: this.editForm.get(["companyId"])!.value
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITimeBandAvailableProfesionalDay>>): void {
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
