import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Lifter } from 'app/shared/model/lifter.model';
import { LifterService } from './lifter.service';
import { LifterComponent } from './lifter.component';
import { LifterDetailComponent } from './lifter-detail.component';
import { LifterUpdateComponent } from './lifter-update.component';
import { LifterDeletePopupComponent } from './lifter-delete-dialog.component';
import { ILifter } from 'app/shared/model/lifter.model';

@Injectable({ providedIn: 'root' })
export class LifterResolve implements Resolve<ILifter> {
  constructor(private service: LifterService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ILifter> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Lifter>) => response.ok),
        map((lifter: HttpResponse<Lifter>) => lifter.body)
      );
    }
    return of(new Lifter());
  }
}

export const lifterRoute: Routes = [
  {
    path: '',
    component: LifterComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Lifters'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: LifterDetailComponent,
    resolve: {
      lifter: LifterResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Lifters'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: LifterUpdateComponent,
    resolve: {
      lifter: LifterResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Lifters'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: LifterUpdateComponent,
    resolve: {
      lifter: LifterResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Lifters'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const lifterPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: LifterDeletePopupComponent,
    resolve: {
      lifter: LifterResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Lifters'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
