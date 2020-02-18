import { IRange } from '../types/options';

interface IModel {
  getRange(): IRange;
  getStart(): number;
  getCurrentValue(): number;
}

interface IModelOptions {
  start: number;
  currentValue: number;
  range: IRange;
}

class Model implements IModel {
  private options: IModelOptions;

  constructor(options: IModelOptions) {
    if (options.range.min > options.range.max) {
      this.throwError('range.min не может быть > range.max');
    }

    this.options = options;
  }

  getRange = () => this.options.range;

  getStart = () => this.options.start;

  getCurrentValue = () => this.options.currentValue;

  private throwError = (errorMsg: string) => {
    throw new Error(errorMsg);
  };
}

export { Model, IModel, IModelOptions };
