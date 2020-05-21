import { ComponentFixture, TestBed } from "@angular/core/testing"
import { ActivatedRoute } from "@angular/router"
import { of } from "rxjs"
import { JhiDataUtils } from "ng-jhipster"

import { CitmilTestModule } from "../../../test.module"
import { TypeServiceDetailComponent } from "app/entities/type-service/type-service-detail.component"
import { TypeService } from "app/shared/model/type-service.model"

describe("Component Tests", () => {
  describe("TypeService Management Detail Component", () => {
    let comp: TypeServiceDetailComponent
    let fixture: ComponentFixture<TypeServiceDetailComponent>
    let dataUtils: JhiDataUtils
    const route = ({ data: of({ typeService: new TypeService(123) }) } as any) as ActivatedRoute

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CitmilTestModule],
        declarations: [TypeServiceDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(TypeServiceDetailComponent, "")
        .compileComponents()
      fixture = TestBed.createComponent(TypeServiceDetailComponent)
      comp = fixture.componentInstance
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils)
    })

    describe("OnInit", () => {
      it("Should load typeService on init", () => {
        // WHEN
        comp.ngOnInit()

        // THEN
        expect(comp.typeService).toEqual(jasmine.objectContaining({ id: 123 }))
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
