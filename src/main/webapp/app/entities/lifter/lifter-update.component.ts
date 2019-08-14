import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ILifter, Lifter } from 'app/shared/model/lifter.model';
import { LifterService } from './lifter.service';

@Component({
  selector: 'jhi-lifter-update',
  templateUrl: './lifter-update.component.html'
})
export class LifterUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    name: [],
    weight: []
  });

  constructor(protected lifterService: LifterService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ lifter }) => {
      this.updateForm(lifter);
    });
  }

  updateForm(lifter: ILifter) {
    this.editForm.patchValue({
      id: lifter.id,
      name: lifter.name,
      weight: lifter.weight
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const lifter = this.createFromForm();
    if (lifter.id !== undefined) {
      this.subscribeToSaveResponse(this.lifterService.update(lifter));
    } else {
      this.subscribeToSaveResponse(this.lifterService.create(lifter));
    }
  }

  private createFromForm(): ILifter {
    return {
      ...new Lifter(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      weight: this.editForm.get(['weight']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILifter>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
