import { ComponentFixture, TestBed } from "@angular/core/testing"
import { ActivatedRoute } from "@angular/router"
import { of } from "rxjs"

import { CitmilTestModule } from "../../../test.module"
import { CalendarYearUserDetailComponent } from "app/entities/calendar-year-user/calendar-year-user-detail.component"
import { CalendarYearUser } from "app/shared/model/calendar-year-user.model"

describe("Component Tests", () => {
  describe("CalendarYearUser Management Detail Component", () => {
    let comp: CalendarYearUserDetailComponent
    let fixture: ComponentFixture<CalendarYearUserDetailComponent>
    const route = ({ data: of({ calendarYearUser: new CalendarYearUser(123) }) } as any) as ActivatedRoute

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CitmilTestModule],
        declarations: [CalendarYearUserDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(CalendarYearUserDetailComponent, "")
        .compileComponents()
      fixture = TestBed.createComponent(CalendarYearUserDetailComponent)
      comp = fixture.componentInstance
    })

    describe("OnInit", () => {
      it("Should load calendarYearUser on init", () => {
        // WHEN
        comp.ngOnInit()

        // THEN
        expect(comp.calendarYearUser).toEqual(jasmine.objectContaining({ id: 123 }))
      })
    })
  })
})
