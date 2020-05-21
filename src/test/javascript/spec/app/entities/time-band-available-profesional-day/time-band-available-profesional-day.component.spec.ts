import { ComponentFixture, TestBed } from "@angular/core/testing"
import { of } from "rxjs"
import { HttpHeaders, HttpResponse } from "@angular/common/http"

import { CitmilTestModule } from "../../../test.module"
import { TimeBandAvailableProfesionalDayComponent } from "app/entities/time-band-available-profesional-day/time-band-available-profesional-day.component"
import { TimeBandAvailableProfesionalDayService } from "app/entities/time-band-available-profesional-day/time-band-available-profesional-day.service"
import { TimeBandAvailableProfesionalDay } from "app/shared/model/time-band-available-profesional-day.model"

describe("Component Tests", () => {
  describe("TimeBandAvailableProfesionalDay Management Component", () => {
    let comp: TimeBandAvailableProfesionalDayComponent
    let fixture: ComponentFixture<TimeBandAvailableProfesionalDayComponent>
    let service: TimeBandAvailableProfesionalDayService

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CitmilTestModule],
        declarations: [TimeBandAvailableProfesionalDayComponent]
      })
        .overrideTemplate(TimeBandAvailableProfesionalDayComponent, "")
        .compileComponents()

      fixture = TestBed.createComponent(TimeBandAvailableProfesionalDayComponent)
      comp = fixture.componentInstance
      service = fixture.debugElement.injector.get(TimeBandAvailableProfesionalDayService)
    })

    it("Should call load all on init", () => {
      // GIVEN
      const headers = new HttpHeaders().append("link", "link;link")
      spyOn(service, "query").and.returnValue(
        of(
          new HttpResponse({
            body: [new TimeBandAvailableProfesionalDay(123)],
            headers
          })
        )
      )

      // WHEN
      comp.ngOnInit()

      // THEN
      expect(service.query).toHaveBeenCalled()
      expect(comp.timeBandAvailableProfesionalDays && comp.timeBandAvailableProfesionalDays[0]).toEqual(jasmine.objectContaining({ id: 123 }))
    })
  })
})
