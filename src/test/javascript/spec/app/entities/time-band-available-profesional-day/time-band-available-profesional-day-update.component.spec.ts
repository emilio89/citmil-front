import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing"
import { HttpResponse } from "@angular/common/http"
import { FormBuilder } from "@angular/forms"
import { of } from "rxjs"

import { CitmilTestModule } from "../../../test.module"
import { TimeBandAvailableProfesionalDayUpdateComponent } from "app/entities/time-band-available-profesional-day/time-band-available-profesional-day-update.component"
import { TimeBandAvailableProfesionalDayService } from "app/entities/time-band-available-profesional-day/time-band-available-profesional-day.service"
import { TimeBandAvailableProfesionalDay } from "app/shared/model/time-band-available-profesional-day.model"

describe("Component Tests", () => {
  describe("TimeBandAvailableProfesionalDay Management Update Component", () => {
    let comp: TimeBandAvailableProfesionalDayUpdateComponent
    let fixture: ComponentFixture<TimeBandAvailableProfesionalDayUpdateComponent>
    let service: TimeBandAvailableProfesionalDayService

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CitmilTestModule],
        declarations: [TimeBandAvailableProfesionalDayUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(TimeBandAvailableProfesionalDayUpdateComponent, "")
        .compileComponents()

      fixture = TestBed.createComponent(TimeBandAvailableProfesionalDayUpdateComponent)
      comp = fixture.componentInstance
      service = fixture.debugElement.injector.get(TimeBandAvailableProfesionalDayService)
    })

    describe("save", () => {
      it("Should call update service on save for existing entity", fakeAsync(() => {
        // GIVEN
        const entity = new TimeBandAvailableProfesionalDay(123)
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
        const entity = new TimeBandAvailableProfesionalDay()
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
