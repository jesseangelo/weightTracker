/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { WeightTrackerTestModule } from '../../../test.module';
import { LifterUpdateComponent } from 'app/entities/lifter/lifter-update.component';
import { LifterService } from 'app/entities/lifter/lifter.service';
import { Lifter } from 'app/shared/model/lifter.model';

describe('Component Tests', () => {
  describe('Lifter Management Update Component', () => {
    let comp: LifterUpdateComponent;
    let fixture: ComponentFixture<LifterUpdateComponent>;
    let service: LifterService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WeightTrackerTestModule],
        declarations: [LifterUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(LifterUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LifterUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LifterService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Lifter('123');
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
        const entity = new Lifter();
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
