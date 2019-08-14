export interface ILifter {
  id?: string;
  name?: string;
  weight?: number;
}

export class Lifter implements ILifter {
  constructor(public id?: string, public name?: string, public weight?: number) {}
}
