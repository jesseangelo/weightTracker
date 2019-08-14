export interface ISet {
  id?: string;
  reps?: number;
  weight?: number;
  exercise?: number;
}

export class Set implements ISet {
  constructor(public id?: string, public reps?: number, public weight?: number, public exercise?: number) {}
}
