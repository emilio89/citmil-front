import { ComponentFixture, TestBed, inject, fakeAsync, tick } from "@angular/core/testing"
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap"
import { of } from "rxjs"
import { JhiEventManager } from "ng-jhipster"

import { CitmilTestModule } from "../../../test.module"
import { MockEventManager } from "../../../helpers/mock-event-manager.service"
import { MockActiveModal } from "../../../helpers/mock-active-modal.service"
import { PublicHolidayDeleteDialogComponent } from "app/entities/public-holiday/public-holiday-delete-dialog.component"
import { PublicHolidayService } from "app/entities/public-holiday/public-holiday.service"

describe("Component Tests", () => {
  describe("PublicHoliday Management Delete Component", () => {
    let comp: PublicHolidayDeleteDialogComponent
    let fixture: ComponentFixture<PublicHolidayDeleteDialogComponent>
    let service: PublicHolidayService
    let mockEventManager: MockEventManager
    let mockActiveModal: MockActiveModal

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CitmilTestModule],
        declarations: [PublicHolidayDeleteDialogComponent]
      })
        .overrideTemplate(PublicHolidayDeleteDialogComponent, "")
        .compileComponents()
      fixture = TestBed.createComponent(PublicHolidayDeleteDialogComponent)
      comp = fixture.componentInstance
      service = fixture.debugElement.injector.get(PublicHolidayService)
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
