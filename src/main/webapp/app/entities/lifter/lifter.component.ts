import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ILifter } from 'app/shared/model/lifter.model';
import { AccountService } from 'app/core';
import { LifterService } from './lifter.service';

@Component({
  selector: 'jhi-lifter',
  templateUrl: './lifter.component.html'
})
export class LifterComponent implements OnInit, OnDestroy {
  lifters: ILifter[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected lifterService: LifterService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.lifterService
      .query()
      .pipe(
        filter((res: HttpResponse<ILifter[]>) => res.ok),
        map((res: HttpResponse<ILifter[]>) => res.body)
      )
      .subscribe(
        (res: ILifter[]) => {
          this.lifters = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInLifters();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ILifter) {
    return item.id;
  }

  registerChangeInLifters() {
    this.eventSubscriber = this.eventManager.subscribe('lifterListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
