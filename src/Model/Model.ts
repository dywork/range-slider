import { IRange } from '../types/options';

interface IModel {
  getOptions(): IModelOptions;
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

  getOptions = () => this.options;

  private throwError = (errorMsg: string) => {
    throw new Error(errorMsg);
  };
}

export { Model, IModel, IModelOptions };
