import { Moment } from 'moment';

export interface ITrainingSession {
  id?: string;
  date?: Moment;
  sets?: number;
}

export class TrainingSession implements ITrainingSession {
  constructor(public id?: string, public date?: Moment, public sets?: number) {}
}
