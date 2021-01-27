import Observer from '../Observer/Observer';
import defaultOptions from '../defaultOptions';
import ISliderOptions from '../ISliderOptions';

class Model extends Observer {
  private sliderOptions: ISliderOptions;

  constructor(sliderOptions: ISliderOptions) {
    super();
    this.sliderOptions = this._getConfirmedOptions(sliderOptions);
  }

  getOptions = () => this.sliderOptions;

  updateSliderOptions = (newSliderOptions: ISliderOptions) => {
    const confirmedOptions = this._getConfirmedOptions(newSliderOptions);
    this.sliderOptions = confirmedOptions;
    this.notify('sliderOptionsUpdate', this.sliderOptions);
  };

  private _getConfirmedOptions = (checkingOptions: ISliderOptions) => {
    const confirmedOptions = { ...checkingOptions };
    const { currentValue, range, step } = confirmedOptions;

    if (!range.min) {
      range.min = defaultOptions.range.min;
    }

    if (!range.max) {
      range.max = defaultOptions.range.max;
    }

    if (!step) {
      confirmedOptions.step = defaultOptions.step;
    }

    if (!currentValue && currentValue !== 0) {
      confirmedOptions.currentValue = range.min;
    }

    if (currentValue instanceof Array) {
      if (this.getOptions()) {
        const { currentValue: oldCurrentValue } = this.getOptions();
        if (oldCurrentValue instanceof Array) {
          const [minCurrentValue, maxCurrentValue] = currentValue;
          const isChangeMinCurrentValue = oldCurrentValue[0] !== minCurrentValue;
          const isChangeMaxCurrentValue = oldCurrentValue[1] !== maxCurrentValue;
          if (isChangeMinCurrentValue) {
            if (minCurrentValue > maxCurrentValue) {
              currentValue[0] = maxCurrentValue;
            }
          }

          if (isChangeMaxCurrentValue) {
            if (maxCurrentValue < minCurrentValue) {
              currentValue[1] = minCurrentValue;
            }
          }
        } else {
          const [oldMinCurrentValue, oldMaxCurrentValue] = currentValue;
          if (oldMinCurrentValue > oldMaxCurrentValue) {
            currentValue[0] = oldMaxCurrentValue;
          }
        }
      }

      if (!currentValue[0]) {
        currentValue[0] = range.min;
      }
      if (!currentValue[1]) {
        currentValue[1] = range.max;
      }

      currentValue[0] = currentValue[0] < range.min ? range.min : currentValue[0];
      currentValue[1] = currentValue[1] > range.max ? range.max : currentValue[1];
    } else if (currentValue < range.min) {
      confirmedOptions.currentValue = range.min;
    } else if (currentValue > range.max) {
      confirmedOptions.currentValue = range.max;
    }

    return confirmedOptions;
  };
}

export default Model;
