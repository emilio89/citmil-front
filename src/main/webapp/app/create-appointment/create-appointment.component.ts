import { JhiAlert, JhiAlertService } from "ng-jhipster"
import { ITypeService } from "app/shared/model/type-service.model"
import { Component, OnInit } from "@angular/core"
import { FormGroup, FormBuilder, Validators } from "@angular/forms"
import { HttpResponse } from "@angular/common/http"
import { Subscription } from "rxjs"
import { CreateAppointmentService } from "./create-appointment.service"
import { MatStepper } from "@angular/material/stepper"

@Component({
  selector: "jhi-create-appointment",
  templateUrl: "./create-appointment.component.html",
  styleUrls: ["create-appointment.component.scss"]
})
export class CreateAppointmentComponent implements OnInit {
  isLinear = false
  firstFormGroup: FormGroup
  secondFormGroup: FormGroup
  thirdFormGroup: FormGroup
  fourthFormGroup: FormGroup

  typeServices?: ITypeService[]
  eventSubscriber?: Subscription
  totalItems = 0
  itemsPerPage = 500
  page!: number
  predicate!: string
  ascending!: boolean
  ngbPaginationPage = 1
  typeService: ITypeService
  alerts: JhiAlert[] = []

  constructor(private formBuilder: FormBuilder, private createAppointmentService: CreateAppointmentService, private alertService: JhiAlertService) {}

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ["", Validators.required]
    })
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ["", Validators.required]
    })
    this.thirdFormGroup = this.formBuilder.group({
      thirdCtrl: ["", Validators.required]
    })
    this.fourthFormGroup = this.formBuilder.group({
      fourthCtrl: ["", Validators.required]
    })
    this.loadPage()
  }

  loadPage(): void {
    this.createAppointmentService
      .getTypesServices({
        page: 0,
        size: this.itemsPerPage,
        sort: ["name", "asc"]
      })
      .subscribe(
        (res: HttpResponse<ITypeService[]>) => (this.typeServices = res.body || []),
        () => this.onError()
      )
  }
  protected onError(): void {
    this.ngbPaginationPage = this.page
  }

  selectService(service: ITypeService, stepper: MatStepper) {
    this.typeService = service
    stepper.next()
  }
  getHoursAvailable() {
    console.error("entra")
    const alert = {
      type: "danger",
      msg: "you should not have pressed this button!",
      timeout: 5000,
      toast: true,
      scoped: true
    }
    this.alertService.info("hola", alert)
    /*    this.alerts.push(
      this.alertService.addAlert(
        {
          type: "danger",
          msg: "you should not have pressed this button!",
          timeout: 5000,
          toast: true,
          scoped: true
        },
        this.alerts
      )
    )*/
  }
}
