import { ComponentFixture, TestBed } from "@angular/core/testing"
import { of } from "rxjs"
import { HttpHeaders, HttpResponse } from "@angular/common/http"

import { CitmilTestModule } from "../../../test.module"
import { MenuOptionsAvailableComponent } from "app/entities/menu-options-available/menu-options-available.component"
import { MenuOptionsAvailableService } from "app/entities/menu-options-available/menu-options-available.service"
import { MenuOptionsAvailable } from "app/shared/model/menu-options-available.model"

describe("Component Tests", () => {
  describe("MenuOptionsAvailable Management Component", () => {
    let comp: MenuOptionsAvailableComponent
    let fixture: ComponentFixture<MenuOptionsAvailableComponent>
    let service: MenuOptionsAvailableService

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CitmilTestModule],
        declarations: [MenuOptionsAvailableComponent]
      })
        .overrideTemplate(MenuOptionsAvailableComponent, "")
        .compileComponents()

      fixture = TestBed.createComponent(MenuOptionsAvailableComponent)
      comp = fixture.componentInstance
      service = fixture.debugElement.injector.get(MenuOptionsAvailableService)
    })

    it("Should call load all on init", () => {
      // GIVEN
      const headers = new HttpHeaders().append("link", "link;link")
      spyOn(service, "query").and.returnValue(
        of(
          new HttpResponse({
            body: [new MenuOptionsAvailable(123)],
            headers
          })
        )
      )

      // WHEN
      comp.ngOnInit()

      // THEN
      expect(service.query).toHaveBeenCalled()
      expect(comp.menuOptionsAvailables && comp.menuOptionsAvailables[0]).toEqual(jasmine.objectContaining({ id: 123 }))
    })
  })
})
