import { Component, OnInit } from "@angular/core"
import { ActivatedRoute } from "@angular/router"

import { ITimeBandAvailableProfesionalDay } from "app/shared/model/time-band-available-profesional-day.model"

@Component({
  selector: "jhi-time-band-available-profesional-day-detail",
  templateUrl: "./time-band-available-profesional-day-detail.component.html"
})
export class TimeBandAvailableProfesionalDayDetailComponent implements OnInit {
  timeBandAvailableProfesionalDay: ITimeBandAvailableProfesionalDay | null = null

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ timeBandAvailableProfesionalDay }) => (this.timeBandAvailableProfesionalDay = timeBandAvailableProfesionalDay))
  }

  previousState(): void {
    window.history.back()
  }
}
