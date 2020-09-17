import Observer from '../Observer/Observer';
import defaultOptions from '../defaultOptions';
import ISliderOptions from '../ISliderOptions';

interface IModel {
  getOptions(): ISliderOptions;
}

class Model extends Observer implements IModel {
  private sliderOptions: ISliderOptions;

  constructor(sliderOptions: ISliderOptions) {
    super();
    this.sliderOptions = this.getVerificateOptions(sliderOptions);
  }

  getOptions = () => this.sliderOptions;

  updateSliderOptions = (newSliderOptions: ISliderOptions) => {
    const verificateOptions = this.getVerificateOptions(newSliderOptions);
    this.sliderOptions = verificateOptions;
    this.notify('sliderOptionsUpdate', this.sliderOptions);
  };

  private getVerificateOptions = (checkingOptions: ISliderOptions) => {
    const verificateOptions = { ...checkingOptions };
    const { currentValue, range, step } = verificateOptions;

    if (!range.min) {
      range.min = defaultOptions.range.min;
    }

    if (!range.max) {
      range.max = defaultOptions.range.max;
    }

    if (!step) {
      verificateOptions.step = defaultOptions.step;
    }

    if (!currentValue && currentValue !== 0) {
      verificateOptions.currentValue = range.min;
    }

    if (currentValue instanceof Array) {
      if (!currentValue[0]) {
        currentValue[0] = range.min;
      }
      if (!currentValue[1]) {
        currentValue[1] = range.max;
      }

      currentValue[0] = currentValue[0] < range.min ? range.min : currentValue[0];
      currentValue[1] = currentValue[1] > range.max ? range.max : currentValue[1];
    } else if (currentValue < range.min) {
      verificateOptions.currentValue = range.min;
    } else if (currentValue > range.max) {
      verificateOptions.currentValue = range.max;
    }

    return verificateOptions;
  };
}

export default Model;
