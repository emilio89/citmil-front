import { HttpService } from "./../shared/service/http.service"
import { IGenerateCalendarWeek } from "./../interface/generate-calendar-week"
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
export class GenerateCalendarWeekService {
  public resourceUrl = SERVER_API_URL + "api/generateCalendarWeek"

  constructor(protected http: HttpClient, protected httpService: HttpService) {}

  generateCalendarWeek(generateCalendarWeek: IGenerateCalendarWeek): Promise<HttpResponse<{}>> {
    /* eslint-disable no-console */
    const copy = this.convertDateFromClientWeek(generateCalendarWeek)
    console.log("lo que se envia es ", copy)

    return this.httpService.post(`${this.resourceUrl}`, copy)
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

  protected convertDateFromClientWeek(generateWeek: IGenerateCalendarWeek): IGenerateCalendarWeek {
    const timeBands = []
    generateWeek.timeBandsDay.forEach(element => {
      const dtend = moment("2020-01-01" + " " + element.end)
      const dtstart = moment("2020-01-01" + " " + element.start)
      const timeBand = { day: element.day, start: dtstart.toJSON(), end: dtend.toJSON() }
      timeBands.push(timeBand)
    })
    const copy: IGenerateCalendarWeek = Object.assign({}, generateWeek, {
      timeBandsDay: timeBands
    })
    return copy
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
