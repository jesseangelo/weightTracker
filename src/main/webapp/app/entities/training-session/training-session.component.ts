import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITrainingSession } from 'app/shared/model/training-session.model';
import { AccountService } from 'app/core';
import { TrainingSessionService } from './training-session.service';

@Component({
  selector: 'jhi-training-session',
  templateUrl: './training-session.component.html'
})
export class TrainingSessionComponent implements OnInit, OnDestroy {
  trainingSessions: ITrainingSession[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected trainingSessionService: TrainingSessionService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.trainingSessionService
      .query()
      .pipe(
        filter((res: HttpResponse<ITrainingSession[]>) => res.ok),
        map((res: HttpResponse<ITrainingSession[]>) => res.body)
      )
      .subscribe(
        (res: ITrainingSession[]) => {
          this.trainingSessions = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInTrainingSessions();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ITrainingSession) {
    return item.id;
  }

  registerChangeInTrainingSessions() {
    this.eventSubscriber = this.eventManager.subscribe('trainingSessionListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
