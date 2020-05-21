import { Injectable } from "@angular/core"
import { HttpClient, HttpResponse } from "@angular/common/http"
import { Observable } from "rxjs"
import { map } from "rxjs/operators"
import * as moment from "moment"

import { DATE_FORMAT } from "app/shared/constants/input.constants"
import { SERVER_API_URL } from "app/app.constants"
import { createRequestOption } from "app/shared/util/request-util"
import { IPublicHoliday } from "app/shared/model/public-holiday.model"

type EntityResponseType = HttpResponse<IPublicHoliday>
type EntityArrayResponseType = HttpResponse<IPublicHoliday[]>

@Injectable({ providedIn: "root" })
export class PublicHolidayService {
  public resourceUrl = SERVER_API_URL + "api/public-holidays"

  constructor(protected http: HttpClient) {}

  create(publicHoliday: IPublicHoliday): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(publicHoliday)
    return this.http
      .post<IPublicHoliday>(this.resourceUrl, copy, { observe: "response" })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)))
  }

  update(publicHoliday: IPublicHoliday): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(publicHoliday)
    return this.http
      .put<IPublicHoliday>(this.resourceUrl, copy, { observe: "response" })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)))
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IPublicHoliday>(`${this.resourceUrl}/${id}`, { observe: "response" })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)))
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req)
    return this.http
      .get<IPublicHoliday[]>(this.resourceUrl, { params: options, observe: "response" })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)))
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: "response" })
  }

  protected convertDateFromClient(publicHoliday: IPublicHoliday): IPublicHoliday {
    const copy: IPublicHoliday = Object.assign({}, publicHoliday, {
      day: publicHoliday.day && publicHoliday.day.isValid() ? publicHoliday.day.format(DATE_FORMAT) : undefined
    })
    return copy
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.day = res.body.day ? moment(res.body.day) : undefined
    }
    return res
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((publicHoliday: IPublicHoliday) => {
        publicHoliday.day = publicHoliday.day ? moment(publicHoliday.day) : undefined
      })
    }
    return res
  }
}
