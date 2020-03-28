interface IOptions {
  currentValue: number;
  minValue: number;
  maxValue: number;
}


class Model {
  private options: IOptions;

  constructor(options: IOptions) {
    this.options = options;
  }
}

export default Model;
