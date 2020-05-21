import { ComponentFixture, TestBed } from "@angular/core/testing"
import { of } from "rxjs"
import { HttpHeaders, HttpResponse } from "@angular/common/http"

import { CitmilTestModule } from "../../../test.module"
import { PublicHolidayComponent } from "app/entities/public-holiday/public-holiday.component"
import { PublicHolidayService } from "app/entities/public-holiday/public-holiday.service"
import { PublicHoliday } from "app/shared/model/public-holiday.model"

describe("Component Tests", () => {
  describe("PublicHoliday Management Component", () => {
    let comp: PublicHolidayComponent
    let fixture: ComponentFixture<PublicHolidayComponent>
    let service: PublicHolidayService

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CitmilTestModule],
        declarations: [PublicHolidayComponent]
      })
        .overrideTemplate(PublicHolidayComponent, "")
        .compileComponents()

      fixture = TestBed.createComponent(PublicHolidayComponent)
      comp = fixture.componentInstance
      service = fixture.debugElement.injector.get(PublicHolidayService)
    })

    it("Should call load all on init", () => {
      // GIVEN
      const headers = new HttpHeaders().append("link", "link;link")
      spyOn(service, "query").and.returnValue(
        of(
          new HttpResponse({
            body: [new PublicHoliday(123)],
            headers
          })
        )
      )

      // WHEN
      comp.ngOnInit()

      // THEN
      expect(service.query).toHaveBeenCalled()
      expect(comp.publicHolidays && comp.publicHolidays[0]).toEqual(jasmine.objectContaining({ id: 123 }))
    })
  })
})
