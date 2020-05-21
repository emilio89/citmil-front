import { Injectable } from "@angular/core"
import { HttpClient, HttpResponse } from "@angular/common/http"
import { Observable } from "rxjs"
import { map } from "rxjs/operators"
import * as moment from "moment"

import { SERVER_API_URL } from "app/app.constants"
import { createRequestOption } from "app/shared/util/request-util"
import { IAppointment } from "app/shared/model/appointment.model"

type EntityResponseType = HttpResponse<IAppointment>
type EntityArrayResponseType = HttpResponse<IAppointment[]>

@Injectable({ providedIn: "root" })
export class AppointmentService {
  public resourceUrl = SERVER_API_URL + "api/appointments"

  constructor(protected http: HttpClient) {}

  create(appointment: IAppointment): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(appointment)
    return this.http
      .post<IAppointment>(this.resourceUrl, copy, { observe: "response" })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)))
  }

  update(appointment: IAppointment): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(appointment)
    return this.http
      .put<IAppointment>(this.resourceUrl, copy, { observe: "response" })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)))
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IAppointment>(`${this.resourceUrl}/${id}`, { observe: "response" })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)))
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req)
    return this.http
      .get<IAppointment[]>(this.resourceUrl, { params: options, observe: "response" })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)))
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: "response" })
  }

  protected convertDateFromClient(appointment: IAppointment): IAppointment {
    const copy: IAppointment = Object.assign({}, appointment, {
      start: appointment.start && appointment.start.isValid() ? appointment.start.toJSON() : undefined,
      end: appointment.end && appointment.end.isValid() ? appointment.end.toJSON() : undefined
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
      res.body.forEach((appointment: IAppointment) => {
        appointment.start = appointment.start ? moment(appointment.start) : undefined
        appointment.end = appointment.end ? moment(appointment.end) : undefined
      })
    }
    return res
  }
}
