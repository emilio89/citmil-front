import { ComponentFixture, TestBed } from "@angular/core/testing"
import { ActivatedRoute } from "@angular/router"
import { of } from "rxjs"
import { JhiDataUtils } from "ng-jhipster"

import { CitmilTestModule } from "../../../test.module"
import { ProfesionalDetailComponent } from "app/entities/profesional/profesional-detail.component"
import { Profesional } from "app/shared/model/profesional.model"

describe("Component Tests", () => {
  describe("Profesional Management Detail Component", () => {
    let comp: ProfesionalDetailComponent
    let fixture: ComponentFixture<ProfesionalDetailComponent>
    let dataUtils: JhiDataUtils
    const route = ({ data: of({ profesional: new Profesional(123) }) } as any) as ActivatedRoute

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CitmilTestModule],
        declarations: [ProfesionalDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ProfesionalDetailComponent, "")
        .compileComponents()
      fixture = TestBed.createComponent(ProfesionalDetailComponent)
      comp = fixture.componentInstance
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils)
    })

    describe("OnInit", () => {
      it("Should load profesional on init", () => {
        // WHEN
        comp.ngOnInit()

        // THEN
        expect(comp.profesional).toEqual(jasmine.objectContaining({ id: 123 }))
      })
    })

    describe("byteSize", () => {
      it("Should call byteSize from JhiDataUtils", () => {
        // GIVEN
        spyOn(dataUtils, "byteSize")
        const fakeBase64 = "fake base64"

        // WHEN
        comp.byteSize(fakeBase64)

        // THEN
        expect(dataUtils.byteSize).toBeCalledWith(fakeBase64)
      })
    })

    describe("openFile", () => {
      it("Should call openFile from JhiDataUtils", () => {
        // GIVEN
        spyOn(dataUtils, "openFile")
        const fakeContentType = "fake content type"
        const fakeBase64 = "fake base64"

        // WHEN
        comp.openFile(fakeContentType, fakeBase64)

        // THEN
        expect(dataUtils.openFile).toBeCalledWith(fakeContentType, fakeBase64)
      })
    })
  })
})
