/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { WeightTrackerTestModule } from '../../../test.module';
import { LifterComponent } from 'app/entities/lifter/lifter.component';
import { LifterService } from 'app/entities/lifter/lifter.service';
import { Lifter } from 'app/shared/model/lifter.model';

describe('Component Tests', () => {
  describe('Lifter Management Component', () => {
    let comp: LifterComponent;
    let fixture: ComponentFixture<LifterComponent>;
    let service: LifterService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WeightTrackerTestModule],
        declarations: [LifterComponent],
        providers: []
      })
        .overrideTemplate(LifterComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LifterComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LifterService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Lifter('123')],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.lifters[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });
  });
});
