interface IModel {
  getRange(): IRange;
}

interface IRange {
  min: number;
  max: number;
}

class Model implements IModel {
  private range: IRange;

  constructor(range: IRange) {
    const { min, max } = range;
    this.range = {
      min,
      max,
    };
  }

  getRange = () => this.range;

  private throwError = (errorMsg: string) => {
    throw new Error(errorMsg);
  };
}

export { Model, IModel };
