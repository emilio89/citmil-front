import { ITypeService } from "app/shared/model/type-service.model"
import { IGenerateCalendarMonth } from "app/interface/generate-calendar-month"
import { HttpService } from "../shared/service/http.service"
import { Injectable } from "@angular/core"
import { HttpClient, HttpResponse } from "@angular/common/http"
import { createRequestOption } from "app/shared/util/request-util"

import { SERVER_API_URL } from "app/app.constants"
import { Observable } from "rxjs"
type EntityResponseType = HttpResponse<ITypeService>
type EntityArrayResponseType = HttpResponse<ITypeService[]>

@Injectable({ providedIn: "root" })
export class CreateAppointmentService {
  public resourceUrl = SERVER_API_URL + "api/createAppointment"

  constructor(protected http: HttpClient, protected httpService: HttpService) {}

  getTypesServices(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req)
    return this.http.get<ITypeService[]>("api/type-services", { params: options, observe: "response" })
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
