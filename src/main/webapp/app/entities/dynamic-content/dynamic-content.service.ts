import { Injectable } from "@angular/core"
import { HttpClient, HttpResponse } from "@angular/common/http"
import { Observable } from "rxjs"

import { SERVER_API_URL } from "app/app.constants"
import { createRequestOption } from "app/shared/util/request-util"
import { IDynamicContent } from "app/shared/model/dynamic-content.model"

type EntityResponseType = HttpResponse<IDynamicContent>
type EntityArrayResponseType = HttpResponse<IDynamicContent[]>

@Injectable({ providedIn: "root" })
export class DynamicContentService {
  public resourceUrl = SERVER_API_URL + "api/dynamic-contents"

  constructor(protected http: HttpClient) {}

  create(dynamicContent: IDynamicContent): Observable<EntityResponseType> {
    return this.http.post<IDynamicContent>(this.resourceUrl, dynamicContent, { observe: "response" })
  }

  update(dynamicContent: IDynamicContent): Observable<EntityResponseType> {
    return this.http.put<IDynamicContent>(this.resourceUrl, dynamicContent, { observe: "response" })
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDynamicContent>(`${this.resourceUrl}/${id}`, { observe: "response" })
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req)
    return this.http.get<IDynamicContent[]>(this.resourceUrl, { params: options, observe: "response" })
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: "response" })
  }
}
