import { IGenerateCalendarMonth } from "app/interface/generate-calendar-month"
import { HttpService } from "../shared/service/http.service"
import { Injectable } from "@angular/core"
import { HttpClient, HttpResponse } from "@angular/common/http"

import { SERVER_API_URL } from "app/app.constants"

@Injectable({ providedIn: "root" })
export class GenerateCalendarMonthsService {
  public resourceUrl = SERVER_API_URL + "api/generateCalendarMonth"

  constructor(protected http: HttpClient, protected httpService: HttpService) {}

  generateCalendarMonths(generateCalendarMonth: IGenerateCalendarMonth): Promise<HttpResponse<{}>> {
    return this.httpService.post(`${this.resourceUrl}`, generateCalendarMonth)
  }

  protected convertDateFromClientIndividualDays(generateCalendarMonth: IGenerateCalendarMonth): IGenerateCalendarMonth {
    const timeBands = []
    generateCalendarMonth.days.forEach(element => {
      const dtend = element.end
      const dtstart = element.start
      const timeBand = { day: element.day, start: dtstart, end: dtend }
      timeBands.push(timeBand)
    })
    const copy: IGenerateCalendarMonth = Object.assign({}, generateCalendarMonth, {
      days: timeBands
    })
    return copy
  }
}
