import { Component, OnInit } from "@angular/core"
import { ActivatedRoute } from "@angular/router"

import { ICalendarYearUser } from "app/shared/model/calendar-year-user.model"

@Component({
  selector: "jhi-calendar-year-user-detail",
  templateUrl: "./calendar-year-user-detail.component.html"
})
export class CalendarYearUserDetailComponent implements OnInit {
  calendarYearUser: ICalendarYearUser | null = null

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ calendarYearUser }) => (this.calendarYearUser = calendarYearUser))
  }

  previousState(): void {
    window.history.back()
  }
}
