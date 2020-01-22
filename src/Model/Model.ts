interface IModel {
  getMinValue(): number;
  setMinValue(value: number): void;
  getMaxValue(): number;
  setMaxValue(value: number): void;
}

class Model implements IModel {
  private minValue: number;

  private maxValue: number;

  constructor(minValue: number = 0, maxValue: number = 100) {
    this.minValue = minValue;
    this.maxValue = maxValue;
  }

  getMinValue = () => this.minValue;

  setMinValue = (value: number) => {
    if (value > this.getMaxValue()) {
      this.throwError('minValue не может быть > maxValue');
    }

    this.minValue = value;
  };

  getMaxValue = () => this.maxValue;

  setMaxValue = (value: number) => {
    if (value < this.getMinValue()) {
      this.throwError('maxValue не может быть < minValue');
    }

    this.maxValue = value;
  };

  private throwError = (errorMsg: string) => {
    throw new Error(errorMsg);
  };
}

export { Model, IModel };
