import { Component, OnInit } from "@angular/core"
import { HttpResponse } from "@angular/common/http"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from "@angular/forms"
import { ActivatedRoute } from "@angular/router"
import { Observable } from "rxjs"

import { IPublicHoliday, PublicHoliday } from "app/shared/model/public-holiday.model"
import { PublicHolidayService } from "./public-holiday.service"
import { ICompany } from "app/shared/model/company.model"
import { CompanyService } from "app/entities/company/company.service"

@Component({
  selector: "jhi-public-holiday-update",
  templateUrl: "./public-holiday-update.component.html"
})
export class PublicHolidayUpdateComponent implements OnInit {
  isSaving = false
  companies: ICompany[] = []
  dayDp: any

  editForm = this.fb.group({
    id: [],
    day: [],
    year: [],
    name: [null, [Validators.maxLength(50)]],
    dni: [null, [Validators.maxLength(12)]],
    companyId: []
  })

  constructor(protected publicHolidayService: PublicHolidayService, protected companyService: CompanyService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ publicHoliday }) => {
      this.updateForm(publicHoliday)

      this.companyService.query().subscribe((res: HttpResponse<ICompany[]>) => (this.companies = res.body || []))
    })
  }

  updateForm(publicHoliday: IPublicHoliday): void {
    this.editForm.patchValue({
      id: publicHoliday.id,
      day: publicHoliday.day,
      year: publicHoliday.year,
      name: publicHoliday.name,
      dni: publicHoliday.dni,
      companyId: publicHoliday.companyId
    })
  }

  previousState(): void {
    window.history.back()
  }

  save(): void {
    this.isSaving = true
    const publicHoliday = this.createFromForm()
    if (publicHoliday.id !== undefined) {
      this.subscribeToSaveResponse(this.publicHolidayService.update(publicHoliday))
    } else {
      this.subscribeToSaveResponse(this.publicHolidayService.create(publicHoliday))
    }
  }

  private createFromForm(): IPublicHoliday {
    return {
      ...new PublicHoliday(),
      id: this.editForm.get(["id"])!.value,
      day: this.editForm.get(["day"])!.value,
      year: this.editForm.get(["year"])!.value,
      name: this.editForm.get(["name"])!.value,
      dni: this.editForm.get(["dni"])!.value,
      companyId: this.editForm.get(["companyId"])!.value
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPublicHoliday>>): void {
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
