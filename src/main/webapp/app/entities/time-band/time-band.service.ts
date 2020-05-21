import { Injectable } from "@angular/core"
import { HttpClient, HttpResponse } from "@angular/common/http"
import { Observable } from "rxjs"
import { map } from "rxjs/operators"
import * as moment from "moment"

import { SERVER_API_URL } from "app/app.constants"
import { createRequestOption } from "app/shared/util/request-util"
import { ITimeBand } from "app/shared/model/time-band.model"

type EntityResponseType = HttpResponse<ITimeBand>
type EntityArrayResponseType = HttpResponse<ITimeBand[]>

@Injectable({ providedIn: "root" })
export class TimeBandService {
  public resourceUrl = SERVER_API_URL + "api/time-bands"

  constructor(protected http: HttpClient) {}

  create(timeBand: ITimeBand): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(timeBand)
    return this.http
      .post<ITimeBand>(this.resourceUrl, copy, { observe: "response" })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)))
  }

  update(timeBand: ITimeBand): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(timeBand)
    return this.http
      .put<ITimeBand>(this.resourceUrl, copy, { observe: "response" })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)))
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ITimeBand>(`${this.resourceUrl}/${id}`, { observe: "response" })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)))
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req)
    return this.http
      .get<ITimeBand[]>(this.resourceUrl, { params: options, observe: "response" })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)))
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: "response" })
  }

  protected convertDateFromClient(timeBand: ITimeBand): ITimeBand {
    const copy: ITimeBand = Object.assign({}, timeBand, {
      start: timeBand.start && timeBand.start.isValid() ? timeBand.start.toJSON() : undefined,
      end: timeBand.end && timeBand.end.isValid() ? timeBand.end.toJSON() : undefined
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
      res.body.forEach((timeBand: ITimeBand) => {
        timeBand.start = timeBand.start ? moment(timeBand.start) : undefined
        timeBand.end = timeBand.end ? moment(timeBand.end) : undefined
      })
    }
    return res
  }
}
