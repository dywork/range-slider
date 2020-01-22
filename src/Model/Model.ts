interface IModel {
  getMinValue(): number;
  getMaxValue(): number;
}

class Model implements IModel {
  private minValue: number;

  private maxValue: number;

  constructor(minValue: number, maxValue: number) {
    this.minValue = minValue;
    this.maxValue = maxValue;
  }

  getMinValue = () => this.minValue;

  getMaxValue = () => this.maxValue;
}

export { Model, IModel };
