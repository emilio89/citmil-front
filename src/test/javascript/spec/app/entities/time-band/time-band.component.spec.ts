import { ComponentFixture, TestBed } from "@angular/core/testing"
import { of } from "rxjs"
import { HttpHeaders, HttpResponse } from "@angular/common/http"

import { CitmilTestModule } from "../../../test.module"
import { TimeBandComponent } from "app/entities/time-band/time-band.component"
import { TimeBandService } from "app/entities/time-band/time-band.service"
import { TimeBand } from "app/shared/model/time-band.model"

describe("Component Tests", () => {
  describe("TimeBand Management Component", () => {
    let comp: TimeBandComponent
    let fixture: ComponentFixture<TimeBandComponent>
    let service: TimeBandService

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CitmilTestModule],
        declarations: [TimeBandComponent]
      })
        .overrideTemplate(TimeBandComponent, "")
        .compileComponents()

      fixture = TestBed.createComponent(TimeBandComponent)
      comp = fixture.componentInstance
      service = fixture.debugElement.injector.get(TimeBandService)
    })

    it("Should call load all on init", () => {
      // GIVEN
      const headers = new HttpHeaders().append("link", "link;link")
      spyOn(service, "query").and.returnValue(
        of(
          new HttpResponse({
            body: [new TimeBand(123)],
            headers
          })
        )
      )

      // WHEN
      comp.ngOnInit()

      // THEN
      expect(service.query).toHaveBeenCalled()
      expect(comp.timeBands && comp.timeBands[0]).toEqual(jasmine.objectContaining({ id: 123 }))
    })
  })
})
