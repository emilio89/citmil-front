import { ComponentFixture, TestBed } from "@angular/core/testing"
import { ActivatedRoute } from "@angular/router"
import { of } from "rxjs"

import { CitmilTestModule } from "../../../test.module"
import { CalendarYearProfesionalDetailComponent } from "app/entities/calendar-year-profesional/calendar-year-profesional-detail.component"
import { CalendarYearProfesional } from "app/shared/model/calendar-year-profesional.model"

describe("Component Tests", () => {
  describe("CalendarYearProfesional Management Detail Component", () => {
    let comp: CalendarYearProfesionalDetailComponent
    let fixture: ComponentFixture<CalendarYearProfesionalDetailComponent>
    const route = ({ data: of({ calendarYearProfesional: new CalendarYearProfesional(123) }) } as any) as ActivatedRoute

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CitmilTestModule],
        declarations: [CalendarYearProfesionalDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(CalendarYearProfesionalDetailComponent, "")
        .compileComponents()
      fixture = TestBed.createComponent(CalendarYearProfesionalDetailComponent)
      comp = fixture.componentInstance
    })

    describe("OnInit", () => {
      it("Should load calendarYearProfesional on init", () => {
        // WHEN
        comp.ngOnInit()

        // THEN
        expect(comp.calendarYearProfesional).toEqual(jasmine.objectContaining({ id: 123 }))
      })
    })
  })
})
