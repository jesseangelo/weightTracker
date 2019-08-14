/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { WeightTrackerTestModule } from '../../../test.module';
import { SetUpdateComponent } from 'app/entities/set/set-update.component';
import { SetService } from 'app/entities/set/set.service';
import { Set } from 'app/shared/model/set.model';

describe('Component Tests', () => {
  describe('Set Management Update Component', () => {
    let comp: SetUpdateComponent;
    let fixture: ComponentFixture<SetUpdateComponent>;
    let service: SetService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WeightTrackerTestModule],
        declarations: [SetUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(SetUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SetUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SetService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Set('123');
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
        const entity = new Set();
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
