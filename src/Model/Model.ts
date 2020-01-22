interface IModel {
  getMinValue(): number;
}

class Model implements IModel {
  private minValue: number;

  constructor(minValue: number) {
    this.minValue = minValue;
  }

  getMinValue = () => this.minValue;
}

export { Model, IModel };
