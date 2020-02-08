import { IOptions, IRange } from '../types/options';

interface IModel {
  getRange(): IRange;
  getStart(): number;
}

class Model implements IModel {
  private options: IOptions;

  constructor(options: IOptions) {
    if (options.range.min > options.range.max) {
      this.throwError('range.min не может быть > range.max');
    }

    this.options = options;
  }

  getRange = () => this.options.range;

  getStart = () => this.options.start;

  private throwError = (errorMsg: string) => {
    throw new Error(errorMsg);
  };
}

export { Model, IModel };
