import { Component, OnInit } from "@angular/core"
import { ActivatedRoute } from "@angular/router"
import { JhiDataUtils } from "ng-jhipster"

import { IProfesional } from "app/shared/model/profesional.model"

@Component({
  selector: "jhi-profesional-detail",
  templateUrl: "./profesional-detail.component.html"
})
export class ProfesionalDetailComponent implements OnInit {
  profesional: IProfesional | null = null

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ profesional }) => (this.profesional = profesional))
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
