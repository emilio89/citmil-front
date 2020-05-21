import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing"
import { HttpResponse } from "@angular/common/http"
import { FormBuilder } from "@angular/forms"
import { of } from "rxjs"

import { CitmilTestModule } from "../../../test.module"
import { PublicHolidayUpdateComponent } from "app/entities/public-holiday/public-holiday-update.component"
import { PublicHolidayService } from "app/entities/public-holiday/public-holiday.service"
import { PublicHoliday } from "app/shared/model/public-holiday.model"

describe("Component Tests", () => {
  describe("PublicHoliday Management Update Component", () => {
    let comp: PublicHolidayUpdateComponent
    let fixture: ComponentFixture<PublicHolidayUpdateComponent>
    let service: PublicHolidayService

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CitmilTestModule],
        declarations: [PublicHolidayUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(PublicHolidayUpdateComponent, "")
        .compileComponents()

      fixture = TestBed.createComponent(PublicHolidayUpdateComponent)
      comp = fixture.componentInstance
      service = fixture.debugElement.injector.get(PublicHolidayService)
    })

    describe("save", () => {
      it("Should call update service on save for existing entity", fakeAsync(() => {
        // GIVEN
        const entity = new PublicHoliday(123)
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
        const entity = new PublicHoliday()
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
