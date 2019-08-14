/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { WeightTrackerTestModule } from '../../../test.module';
import { LifterDeleteDialogComponent } from 'app/entities/lifter/lifter-delete-dialog.component';
import { LifterService } from 'app/entities/lifter/lifter.service';

describe('Component Tests', () => {
  describe('Lifter Management Delete Component', () => {
    let comp: LifterDeleteDialogComponent;
    let fixture: ComponentFixture<LifterDeleteDialogComponent>;
    let service: LifterService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WeightTrackerTestModule],
        declarations: [LifterDeleteDialogComponent]
      })
        .overrideTemplate(LifterDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(LifterDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LifterService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete('123');
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith('123');
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
