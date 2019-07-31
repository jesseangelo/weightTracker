import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { WeightTrackerSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [WeightTrackerSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [WeightTrackerSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WeightTrackerSharedModule {
  static forRoot() {
    return {
      ngModule: WeightTrackerSharedModule
    };
  }
}
