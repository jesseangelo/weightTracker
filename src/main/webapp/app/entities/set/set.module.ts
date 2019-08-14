import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WeightTrackerSharedModule } from 'app/shared';
import {
  SetComponent,
  SetDetailComponent,
  SetUpdateComponent,
  SetDeletePopupComponent,
  SetDeleteDialogComponent,
  setRoute,
  setPopupRoute
} from './';

const ENTITY_STATES = [...setRoute, ...setPopupRoute];

@NgModule({
  imports: [WeightTrackerSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [SetComponent, SetDetailComponent, SetUpdateComponent, SetDeleteDialogComponent, SetDeletePopupComponent],
  entryComponents: [SetComponent, SetUpdateComponent, SetDeleteDialogComponent, SetDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WeightTrackerSetModule {}
