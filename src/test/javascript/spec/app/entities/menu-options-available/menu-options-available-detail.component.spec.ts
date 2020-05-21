import { ComponentFixture, TestBed } from "@angular/core/testing"
import { ActivatedRoute } from "@angular/router"
import { of } from "rxjs"
import { JhiDataUtils } from "ng-jhipster"

import { CitmilTestModule } from "../../../test.module"
import { MenuOptionsAvailableDetailComponent } from "app/entities/menu-options-available/menu-options-available-detail.component"
import { MenuOptionsAvailable } from "app/shared/model/menu-options-available.model"

describe("Component Tests", () => {
  describe("MenuOptionsAvailable Management Detail Component", () => {
    let comp: MenuOptionsAvailableDetailComponent
    let fixture: ComponentFixture<MenuOptionsAvailableDetailComponent>
    let dataUtils: JhiDataUtils
    const route = ({ data: of({ menuOptionsAvailable: new MenuOptionsAvailable(123) }) } as any) as ActivatedRoute

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CitmilTestModule],
        declarations: [MenuOptionsAvailableDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(MenuOptionsAvailableDetailComponent, "")
        .compileComponents()
      fixture = TestBed.createComponent(MenuOptionsAvailableDetailComponent)
      comp = fixture.componentInstance
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils)
    })

    describe("OnInit", () => {
      it("Should load menuOptionsAvailable on init", () => {
        // WHEN
        comp.ngOnInit()

        // THEN
        expect(comp.menuOptionsAvailable).toEqual(jasmine.objectContaining({ id: 123 }))
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
