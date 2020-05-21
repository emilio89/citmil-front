import { Component, OnInit } from "@angular/core"
import { HttpResponse } from "@angular/common/http"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from "@angular/forms"
import { ActivatedRoute } from "@angular/router"
import { Observable } from "rxjs"
import * as moment from "moment"
import { DATE_TIME_FORMAT } from "app/shared/constants/input.constants"

import { IAppointment, Appointment } from "app/shared/model/appointment.model"
import { AppointmentService } from "./appointment.service"
import { IUserExtra } from "app/shared/model/user-extra.model"
import { UserExtraService } from "app/entities/user-extra/user-extra.service"
import { ICompany } from "app/shared/model/company.model"
import { CompanyService } from "app/entities/company/company.service"

type SelectableEntity = IUserExtra | ICompany

@Component({
  selector: "jhi-appointment-update",
  templateUrl: "./appointment-update.component.html"
})
export class AppointmentUpdateComponent implements OnInit {
  isSaving = false
  userextras: IUserExtra[] = []
  companies: ICompany[] = []

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required, Validators.maxLength(255)]],
    comments: [],
    email: [null, [Validators.required, Validators.maxLength(255)]],
    phone: [null, [Validators.maxLength(20)]],
    dni: [null, [Validators.maxLength(12)]],
    start: [],
    end: [],
    actived: [],
    userExtraId: [],
    companyId: []
  })

  constructor(
    protected appointmentService: AppointmentService,
    protected userExtraService: UserExtraService,
    protected companyService: CompanyService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ appointment }) => {
      if (!appointment.id) {
        const today = moment().startOf("day")
        appointment.start = today
        appointment.end = today
      }

      this.updateForm(appointment)

      this.userExtraService.query().subscribe((res: HttpResponse<IUserExtra[]>) => (this.userextras = res.body || []))

      this.companyService.query().subscribe((res: HttpResponse<ICompany[]>) => (this.companies = res.body || []))
    })
  }

  updateForm(appointment: IAppointment): void {
    this.editForm.patchValue({
      id: appointment.id,
      name: appointment.name,
      comments: appointment.comments,
      email: appointment.email,
      phone: appointment.phone,
      dni: appointment.dni,
      start: appointment.start ? appointment.start.format(DATE_TIME_FORMAT) : null,
      end: appointment.end ? appointment.end.format(DATE_TIME_FORMAT) : null,
      actived: appointment.actived,
      userExtraId: appointment.userExtraId,
      companyId: appointment.companyId
    })
  }

  previousState(): void {
    window.history.back()
  }

  save(): void {
    this.isSaving = true
    const appointment = this.createFromForm()
    if (appointment.id !== undefined) {
      this.subscribeToSaveResponse(this.appointmentService.update(appointment))
    } else {
      this.subscribeToSaveResponse(this.appointmentService.create(appointment))
    }
  }

  private createFromForm(): IAppointment {
    return {
      ...new Appointment(),
      id: this.editForm.get(["id"])!.value,
      name: this.editForm.get(["name"])!.value,
      comments: this.editForm.get(["comments"])!.value,
      email: this.editForm.get(["email"])!.value,
      phone: this.editForm.get(["phone"])!.value,
      dni: this.editForm.get(["dni"])!.value,
      start: this.editForm.get(["start"])!.value ? moment(this.editForm.get(["start"])!.value, DATE_TIME_FORMAT) : undefined,
      end: this.editForm.get(["end"])!.value ? moment(this.editForm.get(["end"])!.value, DATE_TIME_FORMAT) : undefined,
      actived: this.editForm.get(["actived"])!.value,
      userExtraId: this.editForm.get(["userExtraId"])!.value,
      companyId: this.editForm.get(["companyId"])!.value
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAppointment>>): void {
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
