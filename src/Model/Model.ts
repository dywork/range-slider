import ISliderOptions from '../interfaces/ISliderOptions';

interface IModel {
  getOptions(): ISliderOptions;
}

class Model implements IModel {
  private options: ISliderOptions;

  constructor(options: ISliderOptions) {
    this.options = options;
  }

  getOptions = () => this.options;
}

export { Model, IModel };
