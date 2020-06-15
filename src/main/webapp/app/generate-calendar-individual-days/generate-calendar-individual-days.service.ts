import { HttpService } from "../shared/service/http.service"
import { IGenerateCalendarIndividualDays } from "../interface/generate-calendar-individual-days"
import { Injectable } from "@angular/core"
import { HttpClient, HttpResponse } from "@angular/common/http"

import { SERVER_API_URL } from "app/app.constants"

@Injectable({ providedIn: "root" })
export class GenerateCalendarIndividualDaysService {
  public resourceUrl = SERVER_API_URL + "api/generateCalendarIndividualDays"

  constructor(protected http: HttpClient, protected httpService: HttpService) {}

  generateCalendarIndividualDays(generateCalendarIndividualDays: IGenerateCalendarIndividualDays): Promise<HttpResponse<{}>> {
    /* eslint-disable no-console */
    const copy = this.convertDateFromClientIndividualDays(generateCalendarIndividualDays)
    console.log("lo que se envia es ", copy)

    return this.httpService.post(`${this.resourceUrl}`, copy)
  }

  protected convertDateFromClientIndividualDays(generateIndividualDays: IGenerateCalendarIndividualDays): IGenerateCalendarIndividualDays {
    const timeBands = []
    generateIndividualDays.timeBandsDay.forEach(element => {
      const dtend = element.end
      const dtstart = element.start
      const timeBand = { day: element.day, start: dtstart, end: dtend }
      timeBands.push(timeBand)
    })
    const copy: IGenerateCalendarIndividualDays = Object.assign({}, generateIndividualDays, {
      timeBandsDay: timeBands
    })
    return copy
  }
}
