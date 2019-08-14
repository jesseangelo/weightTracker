import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Set } from 'app/shared/model/set.model';
import { SetService } from './set.service';
import { SetComponent } from './set.component';
import { SetDetailComponent } from './set-detail.component';
import { SetUpdateComponent } from './set-update.component';
import { SetDeletePopupComponent } from './set-delete-dialog.component';
import { ISet } from 'app/shared/model/set.model';

@Injectable({ providedIn: 'root' })
export class SetResolve implements Resolve<ISet> {
  constructor(private service: SetService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISet> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Set>) => response.ok),
        map((set: HttpResponse<Set>) => set.body)
      );
    }
    return of(new Set());
  }
}

export const setRoute: Routes = [
  {
    path: '',
    component: SetComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Sets'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: SetDetailComponent,
    resolve: {
      set: SetResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Sets'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: SetUpdateComponent,
    resolve: {
      set: SetResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Sets'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: SetUpdateComponent,
    resolve: {
      set: SetResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Sets'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const setPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: SetDeletePopupComponent,
    resolve: {
      set: SetResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Sets'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
