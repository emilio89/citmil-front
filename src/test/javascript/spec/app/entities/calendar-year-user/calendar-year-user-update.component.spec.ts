import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing"
import { HttpResponse } from "@angular/common/http"
import { FormBuilder } from "@angular/forms"
import { of } from "rxjs"

import { CitmilTestModule } from "../../../test.module"
import { CalendarYearUserUpdateComponent } from "app/entities/calendar-year-user/calendar-year-user-update.component"
import { CalendarYearUserService } from "app/entities/calendar-year-user/calendar-year-user.service"
import { CalendarYearUser } from "app/shared/model/calendar-year-user.model"

describe("Component Tests", () => {
  describe("CalendarYearUser Management Update Component", () => {
    let comp: CalendarYearUserUpdateComponent
    let fixture: ComponentFixture<CalendarYearUserUpdateComponent>
    let service: CalendarYearUserService

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CitmilTestModule],
        declarations: [CalendarYearUserUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(CalendarYearUserUpdateComponent, "")
        .compileComponents()

      fixture = TestBed.createComponent(CalendarYearUserUpdateComponent)
      comp = fixture.componentInstance
      service = fixture.debugElement.injector.get(CalendarYearUserService)
    })

    describe("save", () => {
      it("Should call update service on save for existing entity", fakeAsync(() => {
        // GIVEN
        const entity = new CalendarYearUser(123)
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
        const entity = new CalendarYearUser()
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
