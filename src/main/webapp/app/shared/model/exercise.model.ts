export const enum ExerciseType {
  BARBELL = 'BARBELL',
  DUMBBELL = 'DUMBBELL',
  MACHINE = 'MACHINE',
  BAND = 'BAND',
  KETTLEBELL = 'KETTLEBELL',
  BODYWEIGHT = 'BODYWEIGHT',
  TOY = 'TOY'
}

export const enum ExerciseBodyParts {
  SHOULDERS = 'SHOULDERS',
  BICEPS = 'BICEPS',
  TRICEPS = 'TRICEPS',
  BACK = 'BACK',
  CHEST = 'CHEST',
  CORE = 'CORE',
  QUADS = 'QUADS',
  HAMSTRINGS = 'HAMSTRINGS',
  BUNS = 'BUNS',
  GRIP = 'GRIP',
  CALVES = 'CALVES'
}

export interface IExercise {
  id?: string;
  name?: string;
  type?: ExerciseType;
  bodyParts?: ExerciseBodyParts;
}

export class Exercise implements IExercise {
  constructor(public id?: string, public name?: string, public type?: ExerciseType, public bodyParts?: ExerciseBodyParts) {}
}
