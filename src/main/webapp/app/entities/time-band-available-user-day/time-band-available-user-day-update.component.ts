import { Component, OnInit } from "@angular/core"
import { HttpResponse } from "@angular/common/http"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from "@angular/forms"
import { ActivatedRoute } from "@angular/router"
import { Observable } from "rxjs"
import * as moment from "moment"
import { DATE_TIME_FORMAT } from "app/shared/constants/input.constants"

import { ITimeBandAvailableUserDay, TimeBandAvailableUserDay } from "app/shared/model/time-band-available-user-day.model"
import { TimeBandAvailableUserDayService } from "./time-band-available-user-day.service"
import { ICompany } from "app/shared/model/company.model"
import { CompanyService } from "app/entities/company/company.service"

@Component({
  selector: "jhi-time-band-available-user-day-update",
  templateUrl: "./time-band-available-user-day-update.component.html"
})
export class TimeBandAvailableUserDayUpdateComponent implements OnInit {
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
    protected timeBandAvailableUserDayService: TimeBandAvailableUserDayService,
    protected companyService: CompanyService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ timeBandAvailableUserDay }) => {
      if (!timeBandAvailableUserDay.id) {
        const today = moment().startOf("day")
        timeBandAvailableUserDay.start = today
        timeBandAvailableUserDay.end = today
      }

      this.updateForm(timeBandAvailableUserDay)

      this.companyService.query().subscribe((res: HttpResponse<ICompany[]>) => (this.companies = res.body || []))
    })
  }

  updateForm(timeBandAvailableUserDay: ITimeBandAvailableUserDay): void {
    this.editForm.patchValue({
      id: timeBandAvailableUserDay.id,
      year: timeBandAvailableUserDay.year,
      start: timeBandAvailableUserDay.start ? timeBandAvailableUserDay.start.format(DATE_TIME_FORMAT) : null,
      end: timeBandAvailableUserDay.end ? timeBandAvailableUserDay.end.format(DATE_TIME_FORMAT) : null,
      companyId: timeBandAvailableUserDay.companyId
    })
  }

  previousState(): void {
    window.history.back()
  }

  save(): void {
    this.isSaving = true
    const timeBandAvailableUserDay = this.createFromForm()
    if (timeBandAvailableUserDay.id !== undefined) {
      this.subscribeToSaveResponse(this.timeBandAvailableUserDayService.update(timeBandAvailableUserDay))
    } else {
      this.subscribeToSaveResponse(this.timeBandAvailableUserDayService.create(timeBandAvailableUserDay))
    }
  }

  private createFromForm(): ITimeBandAvailableUserDay {
    return {
      ...new TimeBandAvailableUserDay(),
      id: this.editForm.get(["id"])!.value,
      year: this.editForm.get(["year"])!.value,
      start: this.editForm.get(["start"])!.value ? moment(this.editForm.get(["start"])!.value, DATE_TIME_FORMAT) : undefined,
      end: this.editForm.get(["end"])!.value ? moment(this.editForm.get(["end"])!.value, DATE_TIME_FORMAT) : undefined,
      companyId: this.editForm.get(["companyId"])!.value
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITimeBandAvailableUserDay>>): void {
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
