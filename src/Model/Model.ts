import { IOptions, IRange } from '../types/options';

interface IModel {
  getRange(): IRange;
  getStart(): number;
}

class Model implements IModel {
  private start: number;

  private range: IRange;

  constructor(options: IOptions) {
    if (options.range.min > options.range.max) {
      this.throwError('range.min не может быть > range.max');
    }

    const { min, max } = options.range;
    this.start = options.start;
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
