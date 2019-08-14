/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { WeightTrackerTestModule } from '../../../test.module';
import { LifterDetailComponent } from 'app/entities/lifter/lifter-detail.component';
import { Lifter } from 'app/shared/model/lifter.model';

describe('Component Tests', () => {
  describe('Lifter Management Detail Component', () => {
    let comp: LifterDetailComponent;
    let fixture: ComponentFixture<LifterDetailComponent>;
    const route = ({ data: of({ lifter: new Lifter('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WeightTrackerTestModule],
        declarations: [LifterDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(LifterDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(LifterDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.lifter).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
