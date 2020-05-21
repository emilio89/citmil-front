import { Injectable } from "@angular/core"
import { HttpClient, HttpResponse } from "@angular/common/http"
import { Observable } from "rxjs"
import { map } from "rxjs/operators"
import * as moment from "moment"

import { DATE_FORMAT } from "app/shared/constants/input.constants"
import { SERVER_API_URL } from "app/app.constants"
import { createRequestOption } from "app/shared/util/request-util"
import { ICalendarYearUser } from "app/shared/model/calendar-year-user.model"

type EntityResponseType = HttpResponse<ICalendarYearUser>
type EntityArrayResponseType = HttpResponse<ICalendarYearUser[]>

@Injectable({ providedIn: "root" })
export class CalendarYearUserService {
  public resourceUrl = SERVER_API_URL + "api/calendar-year-users"

  constructor(protected http: HttpClient) {}

  create(calendarYearUser: ICalendarYearUser): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(calendarYearUser)
    return this.http
      .post<ICalendarYearUser>(this.resourceUrl, copy, { observe: "response" })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)))
  }

  update(calendarYearUser: ICalendarYearUser): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(calendarYearUser)
    return this.http
      .put<ICalendarYearUser>(this.resourceUrl, copy, { observe: "response" })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)))
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ICalendarYearUser>(`${this.resourceUrl}/${id}`, { observe: "response" })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)))
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req)
    return this.http
      .get<ICalendarYearUser[]>(this.resourceUrl, { params: options, observe: "response" })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)))
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: "response" })
  }

  protected convertDateFromClient(calendarYearUser: ICalendarYearUser): ICalendarYearUser {
    const copy: ICalendarYearUser = Object.assign({}, calendarYearUser, {
      day: calendarYearUser.day && calendarYearUser.day.isValid() ? calendarYearUser.day.format(DATE_FORMAT) : undefined,
      start: calendarYearUser.start && calendarYearUser.start.isValid() ? calendarYearUser.start.toJSON() : undefined,
      end: calendarYearUser.end && calendarYearUser.end.isValid() ? calendarYearUser.end.toJSON() : undefined
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
      res.body.forEach((calendarYearUser: ICalendarYearUser) => {
        calendarYearUser.day = calendarYearUser.day ? moment(calendarYearUser.day) : undefined
        calendarYearUser.start = calendarYearUser.start ? moment(calendarYearUser.start) : undefined
        calendarYearUser.end = calendarYearUser.end ? moment(calendarYearUser.end) : undefined
      })
    }
    return res
  }
}
