import { Moment } from 'moment';
import { ISet } from './set.model';

export interface ITrainingSession {
  id?: string;
  date?: Moment;
  sets?: ISet[];
}

export class TrainingSession implements ITrainingSession {
  constructor(public id?: string, public date?: Moment, public sets?: ISet[]) {}
}
