import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WeightTrackerSharedModule } from 'app/shared';
import { HOME_ROUTE, HomeComponent } from './';
import { TrackComponent } from '../track-ui/track.component';

@NgModule({
  imports: [WeightTrackerSharedModule, RouterModule.forChild([HOME_ROUTE])],
  declarations: [HomeComponent, TrackComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WeightTrackerHomeModule {}
