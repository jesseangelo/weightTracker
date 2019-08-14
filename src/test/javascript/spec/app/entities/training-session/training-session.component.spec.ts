/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { WeightTrackerTestModule } from '../../../test.module';
import { TrainingSessionComponent } from 'app/entities/training-session/training-session.component';
import { TrainingSessionService } from 'app/entities/training-session/training-session.service';
import { TrainingSession } from 'app/shared/model/training-session.model';

describe('Component Tests', () => {
  describe('TrainingSession Management Component', () => {
    let comp: TrainingSessionComponent;
    let fixture: ComponentFixture<TrainingSessionComponent>;
    let service: TrainingSessionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WeightTrackerTestModule],
        declarations: [TrainingSessionComponent],
        providers: []
      })
        .overrideTemplate(TrainingSessionComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TrainingSessionComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TrainingSessionService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new TrainingSession('123')],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.trainingSessions[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });
  });
});
