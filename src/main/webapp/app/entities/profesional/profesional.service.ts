import { Injectable } from "@angular/core"
import { HttpClient, HttpResponse } from "@angular/common/http"
import { Observable } from "rxjs"
import { map } from "rxjs/operators"
import * as moment from "moment"

import { DATE_FORMAT } from "app/shared/constants/input.constants"
import { SERVER_API_URL } from "app/app.constants"
import { createRequestOption } from "app/shared/util/request-util"
import { IProfesional } from "app/shared/model/profesional.model"

type EntityResponseType = HttpResponse<IProfesional>
type EntityArrayResponseType = HttpResponse<IProfesional[]>

@Injectable({ providedIn: "root" })
export class ProfesionalService {
  public resourceUrl = SERVER_API_URL + "api/profesionals"

  constructor(protected http: HttpClient) {}

  create(profesional: IProfesional): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(profesional)
    return this.http
      .post<IProfesional>(this.resourceUrl, copy, { observe: "response" })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)))
  }

  update(profesional: IProfesional): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(profesional)
    return this.http
      .put<IProfesional>(this.resourceUrl, copy, { observe: "response" })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)))
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IProfesional>(`${this.resourceUrl}/${id}`, { observe: "response" })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)))
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req)
    return this.http
      .get<IProfesional[]>(this.resourceUrl, { params: options, observe: "response" })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)))
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: "response" })
  }

  protected convertDateFromClient(profesional: IProfesional): IProfesional {
    const copy: IProfesional = Object.assign({}, profesional, {
      birthdate: profesional.birthdate && profesional.birthdate.isValid() ? profesional.birthdate.format(DATE_FORMAT) : undefined
    })
    return copy
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.birthdate = res.body.birthdate ? moment(res.body.birthdate) : undefined
    }
    return res
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((profesional: IProfesional) => {
        profesional.birthdate = profesional.birthdate ? moment(profesional.birthdate) : undefined
      })
    }
    return res
  }
}
