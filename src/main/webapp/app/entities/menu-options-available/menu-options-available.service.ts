import { Injectable } from "@angular/core"
import { HttpClient, HttpResponse } from "@angular/common/http"
import { Observable } from "rxjs"

import { SERVER_API_URL } from "app/app.constants"
import { createRequestOption } from "app/shared/util/request-util"
import { IMenuOptionsAvailable } from "app/shared/model/menu-options-available.model"

type EntityResponseType = HttpResponse<IMenuOptionsAvailable>
type EntityArrayResponseType = HttpResponse<IMenuOptionsAvailable[]>

@Injectable({ providedIn: "root" })
export class MenuOptionsAvailableService {
  public resourceUrl = SERVER_API_URL + "api/menu-options-availables"

  constructor(protected http: HttpClient) {}

  create(menuOptionsAvailable: IMenuOptionsAvailable): Observable<EntityResponseType> {
    return this.http.post<IMenuOptionsAvailable>(this.resourceUrl, menuOptionsAvailable, { observe: "response" })
  }

  update(menuOptionsAvailable: IMenuOptionsAvailable): Observable<EntityResponseType> {
    return this.http.put<IMenuOptionsAvailable>(this.resourceUrl, menuOptionsAvailable, { observe: "response" })
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMenuOptionsAvailable>(`${this.resourceUrl}/${id}`, { observe: "response" })
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req)
    return this.http.get<IMenuOptionsAvailable[]>(this.resourceUrl, { params: options, observe: "response" })
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: "response" })
  }
}
