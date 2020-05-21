import { ComponentFixture, TestBed } from "@angular/core/testing"
import { ActivatedRoute } from "@angular/router"
import { of } from "rxjs"

import { CitmilTestModule } from "../../../test.module"
import { TimeBandAvailableUserDayDetailComponent } from "app/entities/time-band-available-user-day/time-band-available-user-day-detail.component"
import { TimeBandAvailableUserDay } from "app/shared/model/time-band-available-user-day.model"

describe("Component Tests", () => {
  describe("TimeBandAvailableUserDay Management Detail Component", () => {
    let comp: TimeBandAvailableUserDayDetailComponent
    let fixture: ComponentFixture<TimeBandAvailableUserDayDetailComponent>
    const route = ({ data: of({ timeBandAvailableUserDay: new TimeBandAvailableUserDay(123) }) } as any) as ActivatedRoute

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CitmilTestModule],
        declarations: [TimeBandAvailableUserDayDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(TimeBandAvailableUserDayDetailComponent, "")
        .compileComponents()
      fixture = TestBed.createComponent(TimeBandAvailableUserDayDetailComponent)
      comp = fixture.componentInstance
    })

    describe("OnInit", () => {
      it("Should load timeBandAvailableUserDay on init", () => {
        // WHEN
        comp.ngOnInit()

        // THEN
        expect(comp.timeBandAvailableUserDay).toEqual(jasmine.objectContaining({ id: 123 }))
      })
    })
  })
})
