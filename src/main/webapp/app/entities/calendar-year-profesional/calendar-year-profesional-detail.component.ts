import { Component, OnInit } from "@angular/core"
import { ActivatedRoute } from "@angular/router"

import { ICalendarYearProfesional } from "app/shared/model/calendar-year-profesional.model"

@Component({
  selector: "jhi-calendar-year-profesional-detail",
  templateUrl: "./calendar-year-profesional-detail.component.html"
})
export class CalendarYearProfesionalDetailComponent implements OnInit {
  calendarYearProfesional: ICalendarYearProfesional | null = null

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ calendarYearProfesional }) => (this.calendarYearProfesional = calendarYearProfesional))
  }

  previousState(): void {
    window.history.back()
  }
}
