import { ComponentFixture, TestBed, inject, fakeAsync, tick } from "@angular/core/testing"
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap"
import { of } from "rxjs"
import { JhiEventManager } from "ng-jhipster"

import { CitmilTestModule } from "../../../test.module"
import { MockEventManager } from "../../../helpers/mock-event-manager.service"
import { MockActiveModal } from "../../../helpers/mock-active-modal.service"
import { DynamicContentDeleteDialogComponent } from "app/entities/dynamic-content/dynamic-content-delete-dialog.component"
import { DynamicContentService } from "app/entities/dynamic-content/dynamic-content.service"

describe("Component Tests", () => {
  describe("DynamicContent Management Delete Component", () => {
    let comp: DynamicContentDeleteDialogComponent
    let fixture: ComponentFixture<DynamicContentDeleteDialogComponent>
    let service: DynamicContentService
    let mockEventManager: MockEventManager
    let mockActiveModal: MockActiveModal

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CitmilTestModule],
        declarations: [DynamicContentDeleteDialogComponent]
      })
        .overrideTemplate(DynamicContentDeleteDialogComponent, "")
        .compileComponents()
      fixture = TestBed.createComponent(DynamicContentDeleteDialogComponent)
      comp = fixture.componentInstance
      service = fixture.debugElement.injector.get(DynamicContentService)
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
