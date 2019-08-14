/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { WeightTrackerTestModule } from '../../../test.module';
import { SetDetailComponent } from 'app/entities/set/set-detail.component';
import { Set } from 'app/shared/model/set.model';

describe('Component Tests', () => {
  describe('Set Management Detail Component', () => {
    let comp: SetDetailComponent;
    let fixture: ComponentFixture<SetDetailComponent>;
    const route = ({ data: of({ set: new Set('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WeightTrackerTestModule],
        declarations: [SetDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(SetDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SetDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.set).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
