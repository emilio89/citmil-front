import { ComponentFixture, TestBed } from "@angular/core/testing"
import { ActivatedRoute } from "@angular/router"
import { of } from "rxjs"

import { CitmilTestModule } from "../../../test.module"
import { PublicHolidayDetailComponent } from "app/entities/public-holiday/public-holiday-detail.component"
import { PublicHoliday } from "app/shared/model/public-holiday.model"

describe("Component Tests", () => {
  describe("PublicHoliday Management Detail Component", () => {
    let comp: PublicHolidayDetailComponent
    let fixture: ComponentFixture<PublicHolidayDetailComponent>
    const route = ({ data: of({ publicHoliday: new PublicHoliday(123) }) } as any) as ActivatedRoute

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CitmilTestModule],
        declarations: [PublicHolidayDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PublicHolidayDetailComponent, "")
        .compileComponents()
      fixture = TestBed.createComponent(PublicHolidayDetailComponent)
      comp = fixture.componentInstance
    })

    describe("OnInit", () => {
      it("Should load publicHoliday on init", () => {
        // WHEN
        comp.ngOnInit()

        // THEN
        expect(comp.publicHoliday).toEqual(jasmine.objectContaining({ id: 123 }))
      })
    })
  })
})
