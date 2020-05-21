import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing"
import { HttpResponse } from "@angular/common/http"
import { FormBuilder } from "@angular/forms"
import { of } from "rxjs"

import { CitmilTestModule } from "../../../test.module"
import { MenuOptionsAvailableUpdateComponent } from "app/entities/menu-options-available/menu-options-available-update.component"
import { MenuOptionsAvailableService } from "app/entities/menu-options-available/menu-options-available.service"
import { MenuOptionsAvailable } from "app/shared/model/menu-options-available.model"

describe("Component Tests", () => {
  describe("MenuOptionsAvailable Management Update Component", () => {
    let comp: MenuOptionsAvailableUpdateComponent
    let fixture: ComponentFixture<MenuOptionsAvailableUpdateComponent>
    let service: MenuOptionsAvailableService

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CitmilTestModule],
        declarations: [MenuOptionsAvailableUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(MenuOptionsAvailableUpdateComponent, "")
        .compileComponents()

      fixture = TestBed.createComponent(MenuOptionsAvailableUpdateComponent)
      comp = fixture.componentInstance
      service = fixture.debugElement.injector.get(MenuOptionsAvailableService)
    })

    describe("save", () => {
      it("Should call update service on save for existing entity", fakeAsync(() => {
        // GIVEN
        const entity = new MenuOptionsAvailable(123)
        spyOn(service, "update").and.returnValue(of(new HttpResponse({ body: entity })))
        comp.updateForm(entity)
        // WHEN
        comp.save()
        tick() // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity)
        expect(comp.isSaving).toEqual(false)
      }))

      it("Should call create service on save for new entity", fakeAsync(() => {
        // GIVEN
        const entity = new MenuOptionsAvailable()
        spyOn(service, "create").and.returnValue(of(new HttpResponse({ body: entity })))
        comp.updateForm(entity)
        // WHEN
        comp.save()
        tick() // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity)
        expect(comp.isSaving).toEqual(false)
      }))
    })
  })
})
