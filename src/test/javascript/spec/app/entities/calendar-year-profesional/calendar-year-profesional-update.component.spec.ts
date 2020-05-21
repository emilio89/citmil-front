import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing"
import { HttpResponse } from "@angular/common/http"
import { FormBuilder } from "@angular/forms"
import { of } from "rxjs"

import { CitmilTestModule } from "../../../test.module"
import { CalendarYearProfesionalUpdateComponent } from "app/entities/calendar-year-profesional/calendar-year-profesional-update.component"
import { CalendarYearProfesionalService } from "app/entities/calendar-year-profesional/calendar-year-profesional.service"
import { CalendarYearProfesional } from "app/shared/model/calendar-year-profesional.model"

describe("Component Tests", () => {
  describe("CalendarYearProfesional Management Update Component", () => {
    let comp: CalendarYearProfesionalUpdateComponent
    let fixture: ComponentFixture<CalendarYearProfesionalUpdateComponent>
    let service: CalendarYearProfesionalService

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CitmilTestModule],
        declarations: [CalendarYearProfesionalUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(CalendarYearProfesionalUpdateComponent, "")
        .compileComponents()

      fixture = TestBed.createComponent(CalendarYearProfesionalUpdateComponent)
      comp = fixture.componentInstance
      service = fixture.debugElement.injector.get(CalendarYearProfesionalService)
    })

    describe("save", () => {
      it("Should call update service on save for existing entity", fakeAsync(() => {
        // GIVEN
        const entity = new CalendarYearProfesional(123)
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
        const entity = new CalendarYearProfesional()
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
