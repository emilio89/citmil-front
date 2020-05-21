import { Injectable } from "@angular/core"
import { HttpClient, HttpResponse } from "@angular/common/http"
import { Observable } from "rxjs"
import { map } from "rxjs/operators"
import * as moment from "moment"

import { DATE_FORMAT } from "app/shared/constants/input.constants"
import { SERVER_API_URL } from "app/app.constants"
import { createRequestOption } from "app/shared/util/request-util"
import { ICalendarYearProfesional } from "app/shared/model/calendar-year-profesional.model"

type EntityResponseType = HttpResponse<ICalendarYearProfesional>
type EntityArrayResponseType = HttpResponse<ICalendarYearProfesional[]>

@Injectable({ providedIn: "root" })
export class CalendarYearProfesionalService {
  public resourceUrl = SERVER_API_URL + "api/calendar-year-profesionals"

  constructor(protected http: HttpClient) {}

  create(calendarYearProfesional: ICalendarYearProfesional): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(calendarYearProfesional)
    return this.http
      .post<ICalendarYearProfesional>(this.resourceUrl, copy, { observe: "response" })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)))
  }

  update(calendarYearProfesional: ICalendarYearProfesional): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(calendarYearProfesional)
    return this.http
      .put<ICalendarYearProfesional>(this.resourceUrl, copy, { observe: "response" })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)))
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ICalendarYearProfesional>(`${this.resourceUrl}/${id}`, { observe: "response" })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)))
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req)
    return this.http
      .get<ICalendarYearProfesional[]>(this.resourceUrl, { params: options, observe: "response" })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)))
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: "response" })
  }

  protected convertDateFromClient(calendarYearProfesional: ICalendarYearProfesional): ICalendarYearProfesional {
    const copy: ICalendarYearProfesional = Object.assign({}, calendarYearProfesional, {
      day: calendarYearProfesional.day && calendarYearProfesional.day.isValid() ? calendarYearProfesional.day.format(DATE_FORMAT) : undefined,
      start: calendarYearProfesional.start && calendarYearProfesional.start.isValid() ? calendarYearProfesional.start.toJSON() : undefined,
      end: calendarYearProfesional.end && calendarYearProfesional.end.isValid() ? calendarYearProfesional.end.toJSON() : undefined
    })
    return copy
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.day = res.body.day ? moment(res.body.day) : undefined
      res.body.start = res.body.start ? moment(res.body.start) : undefined
      res.body.end = res.body.end ? moment(res.body.end) : undefined
    }
    return res
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((calendarYearProfesional: ICalendarYearProfesional) => {
        calendarYearProfesional.day = calendarYearProfesional.day ? moment(calendarYearProfesional.day) : undefined
        calendarYearProfesional.start = calendarYearProfesional.start ? moment(calendarYearProfesional.start) : undefined
        calendarYearProfesional.end = calendarYearProfesional.end ? moment(calendarYearProfesional.end) : undefined
      })
    }
    return res
  }
}
