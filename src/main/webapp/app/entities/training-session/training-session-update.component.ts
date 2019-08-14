import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { ITrainingSession, TrainingSession } from 'app/shared/model/training-session.model';
import { TrainingSessionService } from './training-session.service';

@Component({
  selector: 'jhi-training-session-update',
  templateUrl: './training-session-update.component.html'
})
export class TrainingSessionUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    date: [],
    sets: []
  });

  constructor(
    protected trainingSessionService: TrainingSessionService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ trainingSession }) => {
      this.updateForm(trainingSession);
    });
  }

  updateForm(trainingSession: ITrainingSession) {
    this.editForm.patchValue({
      id: trainingSession.id,
      date: trainingSession.date != null ? trainingSession.date.format(DATE_TIME_FORMAT) : null,
      sets: trainingSession.sets
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const trainingSession = this.createFromForm();
    if (trainingSession.id !== undefined) {
      this.subscribeToSaveResponse(this.trainingSessionService.update(trainingSession));
    } else {
      this.subscribeToSaveResponse(this.trainingSessionService.create(trainingSession));
    }
  }

  private createFromForm(): ITrainingSession {
    return {
      ...new TrainingSession(),
      id: this.editForm.get(['id']).value,
      date: this.editForm.get(['date']).value != null ? moment(this.editForm.get(['date']).value, DATE_TIME_FORMAT) : undefined,
      sets: this.editForm.get(['sets']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITrainingSession>>) {
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
