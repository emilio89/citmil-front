import { Component, OnInit } from "@angular/core"
import { ActivatedRoute } from "@angular/router"
import { JhiDataUtils } from "ng-jhipster"

import { IUserExtra } from "app/shared/model/user-extra.model"

@Component({
  selector: "jhi-user-extra-detail",
  templateUrl: "./user-extra-detail.component.html"
})
export class UserExtraDetailComponent implements OnInit {
  userExtra: IUserExtra | null = null

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ userExtra }) => (this.userExtra = userExtra))
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
