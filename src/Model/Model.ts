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
      throw new Error('minValue не может быть > maxValue');
    } else {
      this.minValue = value;
    }
  };

  getMaxValue = () => this.maxValue;

  setMaxValue = (value: number) => {
    this.maxValue = value;
  };
}

export { Model, IModel };
