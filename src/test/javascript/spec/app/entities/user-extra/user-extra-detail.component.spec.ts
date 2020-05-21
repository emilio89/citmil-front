import { ComponentFixture, TestBed } from "@angular/core/testing"
import { ActivatedRoute } from "@angular/router"
import { of } from "rxjs"
import { JhiDataUtils } from "ng-jhipster"

import { CitmilTestModule } from "../../../test.module"
import { UserExtraDetailComponent } from "app/entities/user-extra/user-extra-detail.component"
import { UserExtra } from "app/shared/model/user-extra.model"

describe("Component Tests", () => {
  describe("UserExtra Management Detail Component", () => {
    let comp: UserExtraDetailComponent
    let fixture: ComponentFixture<UserExtraDetailComponent>
    let dataUtils: JhiDataUtils
    const route = ({ data: of({ userExtra: new UserExtra(123) }) } as any) as ActivatedRoute

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CitmilTestModule],
        declarations: [UserExtraDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(UserExtraDetailComponent, "")
        .compileComponents()
      fixture = TestBed.createComponent(UserExtraDetailComponent)
      comp = fixture.componentInstance
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils)
    })

    describe("OnInit", () => {
      it("Should load userExtra on init", () => {
        // WHEN
        comp.ngOnInit()

        // THEN
        expect(comp.userExtra).toEqual(jasmine.objectContaining({ id: 123 }))
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
