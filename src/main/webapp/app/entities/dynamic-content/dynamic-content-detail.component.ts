import { Component, OnInit } from "@angular/core"
import { ActivatedRoute } from "@angular/router"
import { JhiDataUtils } from "ng-jhipster"

import { IDynamicContent } from "app/shared/model/dynamic-content.model"

@Component({
  selector: "jhi-dynamic-content-detail",
  templateUrl: "./dynamic-content-detail.component.html"
})
export class DynamicContentDetailComponent implements OnInit {
  dynamicContent: IDynamicContent | null = null

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ dynamicContent }) => (this.dynamicContent = dynamicContent))
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
