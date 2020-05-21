import { Component, OnInit } from "@angular/core"
import { ActivatedRoute } from "@angular/router"
import { JhiDataUtils } from "ng-jhipster"

import { IMenuOptionsAvailable } from "app/shared/model/menu-options-available.model"

@Component({
  selector: "jhi-menu-options-available-detail",
  templateUrl: "./menu-options-available-detail.component.html"
})
export class MenuOptionsAvailableDetailComponent implements OnInit {
  menuOptionsAvailable: IMenuOptionsAvailable | null = null

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ menuOptionsAvailable }) => (this.menuOptionsAvailable = menuOptionsAvailable))
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
