import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing"
import { HttpResponse } from "@angular/common/http"
import { FormBuilder } from "@angular/forms"
import { of } from "rxjs"

import { CitmilTestModule } from "../../../test.module"
import { DynamicContentUpdateComponent } from "app/entities/dynamic-content/dynamic-content-update.component"
import { DynamicContentService } from "app/entities/dynamic-content/dynamic-content.service"
import { DynamicContent } from "app/shared/model/dynamic-content.model"

describe("Component Tests", () => {
  describe("DynamicContent Management Update Component", () => {
    let comp: DynamicContentUpdateComponent
    let fixture: ComponentFixture<DynamicContentUpdateComponent>
    let service: DynamicContentService

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CitmilTestModule],
        declarations: [DynamicContentUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(DynamicContentUpdateComponent, "")
        .compileComponents()

      fixture = TestBed.createComponent(DynamicContentUpdateComponent)
      comp = fixture.componentInstance
      service = fixture.debugElement.injector.get(DynamicContentService)
    })

    describe("save", () => {
      it("Should call update service on save for existing entity", fakeAsync(() => {
        // GIVEN
        const entity = new DynamicContent(123)
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
        const entity = new DynamicContent()
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
