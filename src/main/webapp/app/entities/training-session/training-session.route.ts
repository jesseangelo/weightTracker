import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TrainingSession } from 'app/shared/model/training-session.model';
import { TrainingSessionService } from './training-session.service';
import { TrainingSessionComponent } from './training-session.component';
import { TrainingSessionDetailComponent } from './training-session-detail.component';
import { TrainingSessionUpdateComponent } from './training-session-update.component';
import { TrainingSessionDeletePopupComponent } from './training-session-delete-dialog.component';
import { ITrainingSession } from 'app/shared/model/training-session.model';

@Injectable({ providedIn: 'root' })
export class TrainingSessionResolve implements Resolve<ITrainingSession> {
  constructor(private service: TrainingSessionService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITrainingSession> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<TrainingSession>) => response.ok),
        map((trainingSession: HttpResponse<TrainingSession>) => trainingSession.body)
      );
    }
    return of(new TrainingSession());
  }
}

export const trainingSessionRoute: Routes = [
  {
    path: '',
    component: TrainingSessionComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TrainingSessions'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TrainingSessionDetailComponent,
    resolve: {
      trainingSession: TrainingSessionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TrainingSessions'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TrainingSessionUpdateComponent,
    resolve: {
      trainingSession: TrainingSessionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TrainingSessions'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TrainingSessionUpdateComponent,
    resolve: {
      trainingSession: TrainingSessionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TrainingSessions'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const trainingSessionPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: TrainingSessionDeletePopupComponent,
    resolve: {
      trainingSession: TrainingSessionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TrainingSessions'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
