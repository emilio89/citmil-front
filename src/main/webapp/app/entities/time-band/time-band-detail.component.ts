import { Component, OnInit } from "@angular/core"
import { ActivatedRoute } from "@angular/router"

import { ITimeBand } from "app/shared/model/time-band.model"

@Component({
  selector: "jhi-time-band-detail",
  templateUrl: "./time-band-detail.component.html"
})
export class TimeBandDetailComponent implements OnInit {
  timeBand: ITimeBand | null = null

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ timeBand }) => (this.timeBand = timeBand))
  }

  previousState(): void {
    window.history.back()
  }
}
