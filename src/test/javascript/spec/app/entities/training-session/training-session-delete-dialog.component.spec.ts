/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { WeightTrackerTestModule } from '../../../test.module';
import { TrainingSessionDeleteDialogComponent } from 'app/entities/training-session/training-session-delete-dialog.component';
import { TrainingSessionService } from 'app/entities/training-session/training-session.service';

describe('Component Tests', () => {
  describe('TrainingSession Management Delete Component', () => {
    let comp: TrainingSessionDeleteDialogComponent;
    let fixture: ComponentFixture<TrainingSessionDeleteDialogComponent>;
    let service: TrainingSessionService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WeightTrackerTestModule],
        declarations: [TrainingSessionDeleteDialogComponent]
      })
        .overrideTemplate(TrainingSessionDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TrainingSessionDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TrainingSessionService);
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
