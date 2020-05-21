import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing"
import { HttpResponse } from "@angular/common/http"
import { FormBuilder } from "@angular/forms"
import { of } from "rxjs"

import { CitmilTestModule } from "../../../test.module"
import { TimeBandUpdateComponent } from "app/entities/time-band/time-band-update.component"
import { TimeBandService } from "app/entities/time-band/time-band.service"
import { TimeBand } from "app/shared/model/time-band.model"

describe("Component Tests", () => {
  describe("TimeBand Management Update Component", () => {
    let comp: TimeBandUpdateComponent
    let fixture: ComponentFixture<TimeBandUpdateComponent>
    let service: TimeBandService

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CitmilTestModule],
        declarations: [TimeBandUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(TimeBandUpdateComponent, "")
        .compileComponents()

      fixture = TestBed.createComponent(TimeBandUpdateComponent)
      comp = fixture.componentInstance
      service = fixture.debugElement.injector.get(TimeBandService)
    })

    describe("save", () => {
      it("Should call update service on save for existing entity", fakeAsync(() => {
        // GIVEN
        const entity = new TimeBand(123)
        spyOn(service, "update").and.returnValue(of(new HttpResponse({ body: entity })))
        comp.updateForm(entity)
        // WHEN
        comp.save()
        tick() // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity)
        expect(comp.isSaving).toEqual(false)
      }))

      it("Should call create service on save for new entity", fakeAsync(() => {
        // GIVEN
        const entity = new TimeBand()
        spyOn(service, "create").and.returnValue(of(new HttpResponse({ body: entity })))
        comp.updateForm(entity)
        // WHEN
        comp.save()
        tick() // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity)
        expect(comp.isSaving).toEqual(false)
      }))
    })
  })
})
