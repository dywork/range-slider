interface IModel {
  getOptions(): IOptions;
}

interface IOptions {
  currentValue: number;
  minValue: number;
  maxValue: number;
}

class Model implements IModel {
  private options: IOptions;

  constructor(options: IOptions) {
    this.options = options;
  }

  getOptions = () => this.options;
}

export default Model;
