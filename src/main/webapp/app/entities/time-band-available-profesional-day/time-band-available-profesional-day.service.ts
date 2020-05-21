import { Injectable } from "@angular/core"
import { HttpClient, HttpResponse } from "@angular/common/http"
import { Observable } from "rxjs"
import { map } from "rxjs/operators"
import * as moment from "moment"

import { SERVER_API_URL } from "app/app.constants"
import { createRequestOption } from "app/shared/util/request-util"
import { ITimeBandAvailableProfesionalDay } from "app/shared/model/time-band-available-profesional-day.model"

type EntityResponseType = HttpResponse<ITimeBandAvailableProfesionalDay>
type EntityArrayResponseType = HttpResponse<ITimeBandAvailableProfesionalDay[]>

@Injectable({ providedIn: "root" })
export class TimeBandAvailableProfesionalDayService {
  public resourceUrl = SERVER_API_URL + "api/time-band-available-profesional-days"

  constructor(protected http: HttpClient) {}

  create(timeBandAvailableProfesionalDay: ITimeBandAvailableProfesionalDay): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(timeBandAvailableProfesionalDay)
    return this.http
      .post<ITimeBandAvailableProfesionalDay>(this.resourceUrl, copy, { observe: "response" })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)))
  }

  update(timeBandAvailableProfesionalDay: ITimeBandAvailableProfesionalDay): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(timeBandAvailableProfesionalDay)
    return this.http
      .put<ITimeBandAvailableProfesionalDay>(this.resourceUrl, copy, { observe: "response" })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)))
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ITimeBandAvailableProfesionalDay>(`${this.resourceUrl}/${id}`, { observe: "response" })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)))
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req)
    return this.http
      .get<ITimeBandAvailableProfesionalDay[]>(this.resourceUrl, { params: options, observe: "response" })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)))
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: "response" })
  }

  protected convertDateFromClient(timeBandAvailableProfesionalDay: ITimeBandAvailableProfesionalDay): ITimeBandAvailableProfesionalDay {
    const copy: ITimeBandAvailableProfesionalDay = Object.assign({}, timeBandAvailableProfesionalDay, {
      start: timeBandAvailableProfesionalDay.start && timeBandAvailableProfesionalDay.start.isValid() ? timeBandAvailableProfesionalDay.start.toJSON() : undefined,
      end: timeBandAvailableProfesionalDay.end && timeBandAvailableProfesionalDay.end.isValid() ? timeBandAvailableProfesionalDay.end.toJSON() : undefined
    })
    return copy
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
      res.body.forEach((timeBandAvailableProfesionalDay: ITimeBandAvailableProfesionalDay) => {
        timeBandAvailableProfesionalDay.start = timeBandAvailableProfesionalDay.start ? moment(timeBandAvailableProfesionalDay.start) : undefined
        timeBandAvailableProfesionalDay.end = timeBandAvailableProfesionalDay.end ? moment(timeBandAvailableProfesionalDay.end) : undefined
      })
    }
    return res
  }
}
