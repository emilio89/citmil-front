import { Component, OnInit } from "@angular/core"
import { ActivatedRoute } from "@angular/router"
import { JhiDataUtils } from "ng-jhipster"

import { ITypeService } from "app/shared/model/type-service.model"

@Component({
  selector: "jhi-type-service-detail",
  templateUrl: "./type-service-detail.component.html"
})
export class TypeServiceDetailComponent implements OnInit {
  typeService: ITypeService | null = null

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ typeService }) => (this.typeService = typeService))
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String)
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String)
  }

  previousState(): void {
    window.history.back()
  }
}
