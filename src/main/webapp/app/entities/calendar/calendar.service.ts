import { IEventCalendarProfesional } from "./../../interface/event-calendar-profesional"
import { Injectable } from "@angular/core"
import { HttpClient, HttpResponse } from "@angular/common/http"

import { SERVER_API_URL } from "app/app.constants"
import { Observable } from "rxjs"
import { map } from "rxjs/operators"
import * as moment from "moment"

type EntityResponseType = HttpResponse<IEventCalendarProfesional>
type EntityArrayResponseType = HttpResponse<IEventCalendarProfesional[]>

@Injectable({ providedIn: "root" })
export class CalendarService {
  public resourceUrl = SERVER_API_URL + "api/calendar"

  constructor(protected http: HttpClient) {}

  getCalendarYearUserProfesional(): Observable<EntityArrayResponseType> {
    return this.http
      .get<IEventCalendarProfesional[]>(`api/getAllEventCalendarProfesional`, { observe: "response" })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)))
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.start = res.body.start ? moment(res.body.start) : undefined
      res.body.end = res.body.end ? moment(res.body.end) : undefined
    }
    return res
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((eventCalendar: IEventCalendarProfesional) => {
        eventCalendar.start = eventCalendar.start ? moment(eventCalendar.start) : undefined
        eventCalendar.end = eventCalendar.end ? moment(eventCalendar.end) : undefined
      })
    }
    return res
  }
}
