import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing"
import { HttpResponse } from "@angular/common/http"
import { FormBuilder } from "@angular/forms"
import { of } from "rxjs"

import { CitmilTestModule } from "../../../test.module"
import { TypeServiceUpdateComponent } from "app/entities/type-service/type-service-update.component"
import { TypeServiceService } from "app/entities/type-service/type-service.service"
import { TypeService } from "app/shared/model/type-service.model"

describe("Component Tests", () => {
  describe("TypeService Management Update Component", () => {
    let comp: TypeServiceUpdateComponent
    let fixture: ComponentFixture<TypeServiceUpdateComponent>
    let service: TypeServiceService

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CitmilTestModule],
        declarations: [TypeServiceUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(TypeServiceUpdateComponent, "")
        .compileComponents()

      fixture = TestBed.createComponent(TypeServiceUpdateComponent)
      comp = fixture.componentInstance
      service = fixture.debugElement.injector.get(TypeServiceService)
    })

    describe("save", () => {
      it("Should call update service on save for existing entity", fakeAsync(() => {
        // GIVEN
        const entity = new TypeService(123)
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
        const entity = new TypeService()
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
