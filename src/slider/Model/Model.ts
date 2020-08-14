import Observer from '../Observer/Observer';
import ISliderOptions from '../ISliderOptions';

interface IModel {
  getOptions(): ISliderOptions;
}

class Model extends Observer implements IModel {
  private sliderOptions: ISliderOptions;

  constructor(sliderOptions: ISliderOptions) {
    super();
    this.sliderOptions = sliderOptions;
  }

  getOptions = () => this.sliderOptions;

  updateSliderOptions = (newSliderOptions: ISliderOptions) => {
    this.sliderOptions = newSliderOptions;
    this.notify('sliderOptionsUpdate', this.sliderOptions);
  };
}

export default Model;
