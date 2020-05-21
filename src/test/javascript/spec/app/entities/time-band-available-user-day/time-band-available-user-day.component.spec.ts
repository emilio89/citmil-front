import { ComponentFixture, TestBed } from "@angular/core/testing"
import { of } from "rxjs"
import { HttpHeaders, HttpResponse } from "@angular/common/http"

import { CitmilTestModule } from "../../../test.module"
import { TimeBandAvailableUserDayComponent } from "app/entities/time-band-available-user-day/time-band-available-user-day.component"
import { TimeBandAvailableUserDayService } from "app/entities/time-band-available-user-day/time-band-available-user-day.service"
import { TimeBandAvailableUserDay } from "app/shared/model/time-band-available-user-day.model"

describe("Component Tests", () => {
  describe("TimeBandAvailableUserDay Management Component", () => {
    let comp: TimeBandAvailableUserDayComponent
    let fixture: ComponentFixture<TimeBandAvailableUserDayComponent>
    let service: TimeBandAvailableUserDayService

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CitmilTestModule],
        declarations: [TimeBandAvailableUserDayComponent]
      })
        .overrideTemplate(TimeBandAvailableUserDayComponent, "")
        .compileComponents()

      fixture = TestBed.createComponent(TimeBandAvailableUserDayComponent)
      comp = fixture.componentInstance
      service = fixture.debugElement.injector.get(TimeBandAvailableUserDayService)
    })

    it("Should call load all on init", () => {
      // GIVEN
      const headers = new HttpHeaders().append("link", "link;link")
      spyOn(service, "query").and.returnValue(
        of(
          new HttpResponse({
            body: [new TimeBandAvailableUserDay(123)],
            headers
          })
        )
      )

      // WHEN
      comp.ngOnInit()

      // THEN
      expect(service.query).toHaveBeenCalled()
      expect(comp.timeBandAvailableUserDays && comp.timeBandAvailableUserDays[0]).toEqual(jasmine.objectContaining({ id: 123 }))
    })
  })
})
