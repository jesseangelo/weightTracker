/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { WeightTrackerTestModule } from '../../../test.module';
import { TrainingSessionDetailComponent } from 'app/entities/training-session/training-session-detail.component';
import { TrainingSession } from 'app/shared/model/training-session.model';

describe('Component Tests', () => {
  describe('TrainingSession Management Detail Component', () => {
    let comp: TrainingSessionDetailComponent;
    let fixture: ComponentFixture<TrainingSessionDetailComponent>;
    const route = ({ data: of({ trainingSession: new TrainingSession('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WeightTrackerTestModule],
        declarations: [TrainingSessionDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(TrainingSessionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TrainingSessionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.trainingSession).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
