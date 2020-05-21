import { ComponentFixture, TestBed } from "@angular/core/testing"
import { ActivatedRoute } from "@angular/router"
import { of } from "rxjs"
import { JhiDataUtils } from "ng-jhipster"

import { CitmilTestModule } from "../../../test.module"
import { DynamicContentDetailComponent } from "app/entities/dynamic-content/dynamic-content-detail.component"
import { DynamicContent } from "app/shared/model/dynamic-content.model"

describe("Component Tests", () => {
  describe("DynamicContent Management Detail Component", () => {
    let comp: DynamicContentDetailComponent
    let fixture: ComponentFixture<DynamicContentDetailComponent>
    let dataUtils: JhiDataUtils
    const route = ({ data: of({ dynamicContent: new DynamicContent(123) }) } as any) as ActivatedRoute

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CitmilTestModule],
        declarations: [DynamicContentDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(DynamicContentDetailComponent, "")
        .compileComponents()
      fixture = TestBed.createComponent(DynamicContentDetailComponent)
      comp = fixture.componentInstance
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils)
    })

    describe("OnInit", () => {
      it("Should load dynamicContent on init", () => {
        // WHEN
        comp.ngOnInit()

        // THEN
        expect(comp.dynamicContent).toEqual(jasmine.objectContaining({ id: 123 }))
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
