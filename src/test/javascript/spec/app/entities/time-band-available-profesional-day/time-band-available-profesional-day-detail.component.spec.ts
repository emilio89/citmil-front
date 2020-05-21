import { ComponentFixture, TestBed } from "@angular/core/testing"
import { ActivatedRoute } from "@angular/router"
import { of } from "rxjs"

import { CitmilTestModule } from "../../../test.module"
import { TimeBandAvailableProfesionalDayDetailComponent } from "app/entities/time-band-available-profesional-day/time-band-available-profesional-day-detail.component"
import { TimeBandAvailableProfesionalDay } from "app/shared/model/time-band-available-profesional-day.model"

describe("Component Tests", () => {
  describe("TimeBandAvailableProfesionalDay Management Detail Component", () => {
    let comp: TimeBandAvailableProfesionalDayDetailComponent
    let fixture: ComponentFixture<TimeBandAvailableProfesionalDayDetailComponent>
    const route = ({ data: of({ timeBandAvailableProfesionalDay: new TimeBandAvailableProfesionalDay(123) }) } as any) as ActivatedRoute

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CitmilTestModule],
        declarations: [TimeBandAvailableProfesionalDayDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(TimeBandAvailableProfesionalDayDetailComponent, "")
        .compileComponents()
      fixture = TestBed.createComponent(TimeBandAvailableProfesionalDayDetailComponent)
      comp = fixture.componentInstance
    })

    describe("OnInit", () => {
      it("Should load timeBandAvailableProfesionalDay on init", () => {
        // WHEN
        comp.ngOnInit()

        // THEN
        expect(comp.timeBandAvailableProfesionalDay).toEqual(jasmine.objectContaining({ id: 123 }))
      })
    })
  })
})
