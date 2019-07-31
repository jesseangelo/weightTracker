import { NgModule } from '@angular/core';

import { WeightTrackerSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
  imports: [WeightTrackerSharedLibsModule],
  declarations: [JhiAlertComponent, JhiAlertErrorComponent],
  exports: [WeightTrackerSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class WeightTrackerSharedCommonModule {}
