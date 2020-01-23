interface IModel {
  getMinValue(): number;
  setMinValue(value: number): void;
  getMaxValue(): number;
  setMaxValue(value: number): void;
}

interface IRange {
  min?: number;
  max?: number;
}

class Model implements IModel {
  private range: IRange;

  constructor(range: IRange = {}) {
    const { min = 0, max = 100 } = range;
    this.range = {
      min,
      max,
    };
  }

  getMinValue = () => this.range.min;

  setMinValue = (value: number) => {
    if (value > this.getMaxValue()) {
      this.throwError('minValue не может быть > maxValue');
    }

    this.range.min = value;
  };

  getMaxValue = () => this.range.max;

  setMaxValue = (value: number) => {
    if (value < this.getMinValue()) {
      this.throwError('maxValue не может быть < minValue');
    }

    this.range.max = value;
  };

  private throwError = (errorMsg: string) => {
    throw new Error(errorMsg);
  };
}

export { Model, IModel };
