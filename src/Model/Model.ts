import { IRange } from '../types/options';

interface IModel {
  getRange(): IRange;
  getStart(): number;
}

class Model implements IModel {
  private start: number;

  private range: IRange;

  // TODO обернуть в 1 объект = options
  constructor(start: number, range: IRange) {
    const { min, max } = range;

    if (range.min > range.max) {
      this.throwError('range.min не может быть > range.max');
    }

    this.start = start;
    this.range = {
      min,
      max,
    };
  }

  getRange = () => this.range;

  getStart = () => this.start;

  private throwError = (errorMsg: string) => {
    throw new Error(errorMsg);
  };
}

export { Model, IModel };
