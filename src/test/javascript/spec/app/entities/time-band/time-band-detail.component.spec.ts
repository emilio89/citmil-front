import { ComponentFixture, TestBed } from "@angular/core/testing"
import { ActivatedRoute } from "@angular/router"
import { of } from "rxjs"

import { CitmilTestModule } from "../../../test.module"
import { TimeBandDetailComponent } from "app/entities/time-band/time-band-detail.component"
import { TimeBand } from "app/shared/model/time-band.model"

describe("Component Tests", () => {
  describe("TimeBand Management Detail Component", () => {
    let comp: TimeBandDetailComponent
    let fixture: ComponentFixture<TimeBandDetailComponent>
    const route = ({ data: of({ timeBand: new TimeBand(123) }) } as any) as ActivatedRoute

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CitmilTestModule],
        declarations: [TimeBandDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(TimeBandDetailComponent, "")
        .compileComponents()
      fixture = TestBed.createComponent(TimeBandDetailComponent)
      comp = fixture.componentInstance
    })

    describe("OnInit", () => {
      it("Should load timeBand on init", () => {
        // WHEN
        comp.ngOnInit()

        // THEN
        expect(comp.timeBand).toEqual(jasmine.objectContaining({ id: 123 }))
      })
    })
  })
})
