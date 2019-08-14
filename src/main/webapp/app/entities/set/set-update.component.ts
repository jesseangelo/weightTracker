import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ISet, Set } from 'app/shared/model/set.model';
import { SetService } from './set.service';

@Component({
  selector: 'jhi-set-update',
  templateUrl: './set-update.component.html'
})
export class SetUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    reps: [],
    weight: [],
    exercise: []
  });

  constructor(protected setService: SetService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ set }) => {
      this.updateForm(set);
    });
  }

  updateForm(set: ISet) {
    this.editForm.patchValue({
      id: set.id,
      reps: set.reps,
      weight: set.weight,
      exercise: set.exercise
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const set = this.createFromForm();
    if (set.id !== undefined) {
      this.subscribeToSaveResponse(this.setService.update(set));
    } else {
      this.subscribeToSaveResponse(this.setService.create(set));
    }
  }

  private createFromForm(): ISet {
    return {
      ...new Set(),
      id: this.editForm.get(['id']).value,
      reps: this.editForm.get(['reps']).value,
      weight: this.editForm.get(['weight']).value,
      exercise: this.editForm.get(['exercise']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISet>>) {
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
