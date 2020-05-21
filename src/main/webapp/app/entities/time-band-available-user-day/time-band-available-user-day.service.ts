import { Injectable } from "@angular/core"
import { HttpClient, HttpResponse } from "@angular/common/http"
import { Observable } from "rxjs"
import { map } from "rxjs/operators"
import * as moment from "moment"

import { SERVER_API_URL } from "app/app.constants"
import { createRequestOption } from "app/shared/util/request-util"
import { ITimeBandAvailableUserDay } from "app/shared/model/time-band-available-user-day.model"

type EntityResponseType = HttpResponse<ITimeBandAvailableUserDay>
type EntityArrayResponseType = HttpResponse<ITimeBandAvailableUserDay[]>

@Injectable({ providedIn: "root" })
export class TimeBandAvailableUserDayService {
  public resourceUrl = SERVER_API_URL + "api/time-band-available-user-days"

  constructor(protected http: HttpClient) {}

  create(timeBandAvailableUserDay: ITimeBandAvailableUserDay): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(timeBandAvailableUserDay)
    return this.http
      .post<ITimeBandAvailableUserDay>(this.resourceUrl, copy, { observe: "response" })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)))
  }

  update(timeBandAvailableUserDay: ITimeBandAvailableUserDay): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(timeBandAvailableUserDay)
    return this.http
      .put<ITimeBandAvailableUserDay>(this.resourceUrl, copy, { observe: "response" })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)))
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ITimeBandAvailableUserDay>(`${this.resourceUrl}/${id}`, { observe: "response" })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)))
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req)
    return this.http
      .get<ITimeBandAvailableUserDay[]>(this.resourceUrl, { params: options, observe: "response" })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)))
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: "response" })
  }

  protected convertDateFromClient(timeBandAvailableUserDay: ITimeBandAvailableUserDay): ITimeBandAvailableUserDay {
    const copy: ITimeBandAvailableUserDay = Object.assign({}, timeBandAvailableUserDay, {
      start: timeBandAvailableUserDay.start && timeBandAvailableUserDay.start.isValid() ? timeBandAvailableUserDay.start.toJSON() : undefined,
      end: timeBandAvailableUserDay.end && timeBandAvailableUserDay.end.isValid() ? timeBandAvailableUserDay.end.toJSON() : undefined
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
      res.body.forEach((timeBandAvailableUserDay: ITimeBandAvailableUserDay) => {
        timeBandAvailableUserDay.start = timeBandAvailableUserDay.start ? moment(timeBandAvailableUserDay.start) : undefined
        timeBandAvailableUserDay.end = timeBandAvailableUserDay.end ? moment(timeBandAvailableUserDay.end) : undefined
      })
    }
    return res
  }
}
