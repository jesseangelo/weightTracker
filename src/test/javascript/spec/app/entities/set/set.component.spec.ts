/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { WeightTrackerTestModule } from '../../../test.module';
import { SetComponent } from 'app/entities/set/set.component';
import { SetService } from 'app/entities/set/set.service';
import { Set } from 'app/shared/model/set.model';

describe('Component Tests', () => {
  describe('Set Management Component', () => {
    let comp: SetComponent;
    let fixture: ComponentFixture<SetComponent>;
    let service: SetService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WeightTrackerTestModule],
        declarations: [SetComponent],
        providers: []
      })
        .overrideTemplate(SetComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SetComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SetService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Set('123')],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.sets[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });
  });
});
