import { ComponentFixture, TestBed, inject, fakeAsync, tick } from "@angular/core/testing"
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap"
import { of } from "rxjs"
import { JhiEventManager } from "ng-jhipster"

import { CitmilTestModule } from "../../../test.module"
import { MockEventManager } from "../../../helpers/mock-event-manager.service"
import { MockActiveModal } from "../../../helpers/mock-active-modal.service"
import { TimeBandAvailableUserDayDeleteDialogComponent } from "app/entities/time-band-available-user-day/time-band-available-user-day-delete-dialog.component"
import { TimeBandAvailableUserDayService } from "app/entities/time-band-available-user-day/time-band-available-user-day.service"

describe("Component Tests", () => {
  describe("TimeBandAvailableUserDay Management Delete Component", () => {
    let comp: TimeBandAvailableUserDayDeleteDialogComponent
    let fixture: ComponentFixture<TimeBandAvailableUserDayDeleteDialogComponent>
    let service: TimeBandAvailableUserDayService
    let mockEventManager: MockEventManager
    let mockActiveModal: MockActiveModal

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CitmilTestModule],
        declarations: [TimeBandAvailableUserDayDeleteDialogComponent]
      })
        .overrideTemplate(TimeBandAvailableUserDayDeleteDialogComponent, "")
        .compileComponents()
      fixture = TestBed.createComponent(TimeBandAvailableUserDayDeleteDialogComponent)
      comp = fixture.componentInstance
      service = fixture.debugElement.injector.get(TimeBandAvailableUserDayService)
      mockEventManager = TestBed.get(JhiEventManager)
      mockActiveModal = TestBed.get(NgbActiveModal)
    })

    describe("confirmDelete", () => {
      it("Should call delete service on confirmDelete", inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, "delete").and.returnValue(of({}))

          // WHEN
          comp.confirmDelete(123)
          tick()

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123)
          expect(mockActiveModal.closeSpy).toHaveBeenCalled()
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled()
        })
      ))

      it("Should not call delete service on clear", () => {
        // GIVEN
        spyOn(service, "delete")

        // WHEN
        comp.cancel()

        // THEN
        expect(service.delete).not.toHaveBeenCalled()
        expect(mockActiveModal.dismissSpy).toHaveBeenCalled()
      })
    })
  })
})
