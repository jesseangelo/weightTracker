import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WeightTrackerSharedModule } from 'app/shared';
import {
  LifterComponent,
  LifterDetailComponent,
  LifterUpdateComponent,
  LifterDeletePopupComponent,
  LifterDeleteDialogComponent,
  lifterRoute,
  lifterPopupRoute
} from './';

const ENTITY_STATES = [...lifterRoute, ...lifterPopupRoute];

@NgModule({
  imports: [WeightTrackerSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [LifterComponent, LifterDetailComponent, LifterUpdateComponent, LifterDeleteDialogComponent, LifterDeletePopupComponent],
  entryComponents: [LifterComponent, LifterUpdateComponent, LifterDeleteDialogComponent, LifterDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WeightTrackerLifterModule {}
