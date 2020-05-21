import { Component, OnInit } from "@angular/core"
import { ActivatedRoute } from "@angular/router"

import { ITimeBandAvailableUserDay } from "app/shared/model/time-band-available-user-day.model"

@Component({
  selector: "jhi-time-band-available-user-day-detail",
  templateUrl: "./time-band-available-user-day-detail.component.html"
})
export class TimeBandAvailableUserDayDetailComponent implements OnInit {
  timeBandAvailableUserDay: ITimeBandAvailableUserDay | null = null

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ timeBandAvailableUserDay }) => (this.timeBandAvailableUserDay = timeBandAvailableUserDay))
  }

  previousState(): void {
    window.history.back()
  }
}
