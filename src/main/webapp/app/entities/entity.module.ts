import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'lifter',
        loadChildren: './lifter/lifter.module#WeightTrackerLifterModule'
      },
      {
        path: 'exercise',
        loadChildren: './exercise/exercise.module#WeightTrackerExerciseModule'
      },
      {
        path: 'set',
        loadChildren: './set/set.module#WeightTrackerSetModule'
      },
      {
        path: 'training-session',
        loadChildren: './training-session/training-session.module#WeightTrackerTrainingSessionModule'
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WeightTrackerEntityModule {}
