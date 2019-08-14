import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ISet } from 'app/shared/model/set.model';
import { AccountService } from 'app/core';
import { SetService } from './set.service';

@Component({
  selector: 'jhi-set',
  templateUrl: './set.component.html'
})
export class SetComponent implements OnInit, OnDestroy {
  sets: ISet[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected setService: SetService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.setService
      .query()
      .pipe(
        filter((res: HttpResponse<ISet[]>) => res.ok),
        map((res: HttpResponse<ISet[]>) => res.body)
      )
      .subscribe(
        (res: ISet[]) => {
          this.sets = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInSets();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ISet) {
    return item.id;
  }

  registerChangeInSets() {
    this.eventSubscriber = this.eventManager.subscribe('setListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
