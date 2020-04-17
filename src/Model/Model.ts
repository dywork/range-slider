import Observer from '../Observer/Observer';

interface IModel {
  getOptions(): IModelOptions;
}

interface IModelOptions {
  currentValue: number | number[];
  range: { min: number; max: number };
  step: number;
}

class Model extends Observer implements IModel {
  private sliderOptions: IModelOptions;

  constructor(sliderOptions: IModelOptions) {
    super();
    this.sliderOptions = sliderOptions;
  }

  getOptions = () => this.sliderOptions;

  updateSliderOptions = (newSliderOptions: IModelOptions) => {
    this.sliderOptions = newSliderOptions;
    this.notify('sliderOptionsUpdate', this.sliderOptions);
  };
}

export { Model, IModelOptions };
