import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing"
import { HttpResponse } from "@angular/common/http"
import { FormBuilder } from "@angular/forms"
import { of } from "rxjs"

import { CitmilTestModule } from "../../../test.module"
import { TimeBandAvailableUserDayUpdateComponent } from "app/entities/time-band-available-user-day/time-band-available-user-day-update.component"
import { TimeBandAvailableUserDayService } from "app/entities/time-band-available-user-day/time-band-available-user-day.service"
import { TimeBandAvailableUserDay } from "app/shared/model/time-band-available-user-day.model"

describe("Component Tests", () => {
  describe("TimeBandAvailableUserDay Management Update Component", () => {
    let comp: TimeBandAvailableUserDayUpdateComponent
    let fixture: ComponentFixture<TimeBandAvailableUserDayUpdateComponent>
    let service: TimeBandAvailableUserDayService

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CitmilTestModule],
        declarations: [TimeBandAvailableUserDayUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(TimeBandAvailableUserDayUpdateComponent, "")
        .compileComponents()

      fixture = TestBed.createComponent(TimeBandAvailableUserDayUpdateComponent)
      comp = fixture.componentInstance
      service = fixture.debugElement.injector.get(TimeBandAvailableUserDayService)
    })

    describe("save", () => {
      it("Should call update service on save for existing entity", fakeAsync(() => {
        // GIVEN
        const entity = new TimeBandAvailableUserDay(123)
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
        const entity = new TimeBandAvailableUserDay()
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
