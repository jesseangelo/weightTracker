import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { FormBuilder, Validators } from '@angular/forms';

import { ILifter } from 'app/shared/model/lifter.model';
import { AccountService } from 'app/core';
import { LifterService } from '../entities/lifter/lifter.service';
import { ITrainingSession } from 'app/shared/model/training-session.model';
import { TrainingSessionService } from '../entities/training-session/training-session.service';

import { IExercise } from 'app/shared/model/exercise.model';
import { ExerciseService } from '../entities/exercise/exercise.service';

import { ISet } from 'app/shared/model/set.model';

@Component({
  selector: 'jhi-tracker',
  templateUrl: './track.component.html'
})
export class TrackComponent implements OnInit {
  lifters: ILifter[];
  trainingSessions: ITrainingSession[];
  exercises: IExercise[];
  currentAccount: any;
  eventSubscriber: Subscription;
  sets: ISet[];

  setEditForm = this.fb.group({
    id: String,
    reps: Number,
    weight: Number,
    exercise: []
  });

  sessionForm = this.fb.group({
    id: [],
    date: [],
    sets: []
  });

  constructor(
    protected lifterService: LifterService,
    protected trainingSessionService: TrainingSessionService,
    protected exerciseService: ExerciseService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService,
    private fb: FormBuilder
  ) {}

  loadAll() {
    this.lifterService
      .query()
      .pipe(
        filter((res: HttpResponse<ILifter[]>) => res.ok),
        map((res: HttpResponse<ILifter[]>) => res.body),
        tap(console.log)
      )
      .subscribe(
        (res: ILifter[]) => {
          this.lifters = res;
        }
        // (res: HttpErrorResponse) => this.onError(res.message)
      );

    this.exerciseService
      .query()
      .pipe(
        filter((res: HttpResponse<IExercise[]>) => res.ok),
        map((res: HttpResponse<IExercise[]>) => res.body)
      )
      .subscribe(
        (res: IExercise[]) => {
          this.exercises = res;
        }
        // (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    // this.registerChangeInLifters();
  }

  newSession() {
    // this.trainingSessionService.create()
  }

  // Set
  private createNewSet() {
    // let s = new Set(
    //   this.setEditForm.get(['id']).value,
    //   this.setEditForm.get(['reps']).value,
    //   this.setEditForm.get(['weight']).value,
    //   this.setEditForm.get(['exercise']).value
    // );
    console.log(this.setEditForm.get(['reps']).value);
  }
}
