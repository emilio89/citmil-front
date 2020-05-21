import { ComponentFixture, TestBed } from "@angular/core/testing"
import { of } from "rxjs"
import { HttpHeaders, HttpResponse } from "@angular/common/http"

import { CitmilTestModule } from "../../../test.module"
import { CalendarYearProfesionalComponent } from "app/entities/calendar-year-profesional/calendar-year-profesional.component"
import { CalendarYearProfesionalService } from "app/entities/calendar-year-profesional/calendar-year-profesional.service"
import { CalendarYearProfesional } from "app/shared/model/calendar-year-profesional.model"

describe("Component Tests", () => {
  describe("CalendarYearProfesional Management Component", () => {
    let comp: CalendarYearProfesionalComponent
    let fixture: ComponentFixture<CalendarYearProfesionalComponent>
    let service: CalendarYearProfesionalService

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CitmilTestModule],
        declarations: [CalendarYearProfesionalComponent]
      })
        .overrideTemplate(CalendarYearProfesionalComponent, "")
        .compileComponents()

      fixture = TestBed.createComponent(CalendarYearProfesionalComponent)
      comp = fixture.componentInstance
      service = fixture.debugElement.injector.get(CalendarYearProfesionalService)
    })

    it("Should call load all on init", () => {
      // GIVEN
      const headers = new HttpHeaders().append("link", "link;link")
      spyOn(service, "query").and.returnValue(
        of(
          new HttpResponse({
            body: [new CalendarYearProfesional(123)],
            headers
          })
        )
      )

      // WHEN
      comp.ngOnInit()

      // THEN
      expect(service.query).toHaveBeenCalled()
      expect(comp.calendarYearProfesionals && comp.calendarYearProfesionals[0]).toEqual(jasmine.objectContaining({ id: 123 }))
    })
  })
})
