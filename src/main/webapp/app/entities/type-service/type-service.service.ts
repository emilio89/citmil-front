import { Injectable } from "@angular/core"
import { HttpClient, HttpResponse } from "@angular/common/http"
import { Observable } from "rxjs"

import { SERVER_API_URL } from "app/app.constants"
import { createRequestOption } from "app/shared/util/request-util"
import { ITypeService } from "app/shared/model/type-service.model"

type EntityResponseType = HttpResponse<ITypeService>
type EntityArrayResponseType = HttpResponse<ITypeService[]>

@Injectable({ providedIn: "root" })
export class TypeServiceService {
  public resourceUrl = SERVER_API_URL + "api/type-services"

  constructor(protected http: HttpClient) {}

  create(typeService: ITypeService): Observable<EntityResponseType> {
    return this.http.post<ITypeService>(this.resourceUrl, typeService, { observe: "response" })
  }

  update(typeService: ITypeService): Observable<EntityResponseType> {
    return this.http.put<ITypeService>(this.resourceUrl, typeService, { observe: "response" })
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITypeService>(`${this.resourceUrl}/${id}`, { observe: "response" })
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req)
    return this.http.get<ITypeService[]>(this.resourceUrl, { params: options, observe: "response" })
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: "response" })
  }
}
