import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WeightTrackerSharedModule } from 'app/shared';
import {
  TrainingSessionComponent,
  TrainingSessionDetailComponent,
  TrainingSessionUpdateComponent,
  TrainingSessionDeletePopupComponent,
  TrainingSessionDeleteDialogComponent,
  trainingSessionRoute,
  trainingSessionPopupRoute
} from './';

const ENTITY_STATES = [...trainingSessionRoute, ...trainingSessionPopupRoute];

@NgModule({
  imports: [WeightTrackerSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    TrainingSessionComponent,
    TrainingSessionDetailComponent,
    TrainingSessionUpdateComponent,
    TrainingSessionDeleteDialogComponent,
    TrainingSessionDeletePopupComponent
  ],
  entryComponents: [
    TrainingSessionComponent,
    TrainingSessionUpdateComponent,
    TrainingSessionDeleteDialogComponent,
    TrainingSessionDeletePopupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WeightTrackerTrainingSessionModule {}
