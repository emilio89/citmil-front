import { Component, OnInit } from "@angular/core"
import { FormGroup, FormBuilder, Validators } from "@angular/forms"

@Component({
  selector: "jhi-generate-calendar-month",
  templateUrl: "./generate-calendar-month.component.html",
  styleUrls: ["generate-calendar-month.component.scss"]
})
export class GenerateCalendarMonthComponent implements OnInit {
  isLinear = false
  firstFormGroup!: FormGroup
  secondFormGroup!: FormGroup

  constructor(private formBuilder: FormBuilder) {}
  ngOnInit(): void {
    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ["", Validators.required]
    })
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ["", Validators.required]
    })
  }
}
