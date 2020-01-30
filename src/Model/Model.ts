interface IModel {
  getRange(): IRange;
  getStart(): number;
}

interface IRange {
  min: number;
  max: number;
}

class Model implements IModel {
  private start: number;

  private range: IRange;

  constructor(start: number, range: IRange) {
    const { min, max } = range;

    if (range.min > range.max) {
      this.throwError('range.min не может быть > range.max');
    }

    this.start = start;
    this.range = {
      min,
      max,
    };
  }

  getRange = () => this.range;

  getStart = () => this.start;

  private throwError = (errorMsg: string) => {
    throw new Error(errorMsg);
  };
}

export { Model, IModel, IRange };