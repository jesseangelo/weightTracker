/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { WeightTrackerTestModule } from '../../../test.module';
import { TrainingSessionUpdateComponent } from 'app/entities/training-session/training-session-update.component';
import { TrainingSessionService } from 'app/entities/training-session/training-session.service';
import { TrainingSession } from 'app/shared/model/training-session.model';

describe('Component Tests', () => {
  describe('TrainingSession Management Update Component', () => {
    let comp: TrainingSessionUpdateComponent;
    let fixture: ComponentFixture<TrainingSessionUpdateComponent>;
    let service: TrainingSessionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WeightTrackerTestModule],
        declarations: [TrainingSessionUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(TrainingSessionUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TrainingSessionUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TrainingSessionService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new TrainingSession('123');
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new TrainingSession();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
