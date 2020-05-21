import { ComponentFixture, TestBed } from "@angular/core/testing"
import { of } from "rxjs"
import { HttpHeaders, HttpResponse } from "@angular/common/http"

import { CitmilTestModule } from "../../../test.module"
import { CalendarYearUserComponent } from "app/entities/calendar-year-user/calendar-year-user.component"
import { CalendarYearUserService } from "app/entities/calendar-year-user/calendar-year-user.service"
import { CalendarYearUser } from "app/shared/model/calendar-year-user.model"

describe("Component Tests", () => {
  describe("CalendarYearUser Management Component", () => {
    let comp: CalendarYearUserComponent
    let fixture: ComponentFixture<CalendarYearUserComponent>
    let service: CalendarYearUserService

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CitmilTestModule],
        declarations: [CalendarYearUserComponent]
      })
        .overrideTemplate(CalendarYearUserComponent, "")
        .compileComponents()

      fixture = TestBed.createComponent(CalendarYearUserComponent)
      comp = fixture.componentInstance
      service = fixture.debugElement.injector.get(CalendarYearUserService)
    })

    it("Should call load all on init", () => {
      // GIVEN
      const headers = new HttpHeaders().append("link", "link;link")
      spyOn(service, "query").and.returnValue(
        of(
          new HttpResponse({
            body: [new CalendarYearUser(123)],
            headers
          })
        )
      )

      // WHEN
      comp.ngOnInit()

      // THEN
      expect(service.query).toHaveBeenCalled()
      expect(comp.calendarYearUsers && comp.calendarYearUsers[0]).toEqual(jasmine.objectContaining({ id: 123 }))
    })
  })
})
