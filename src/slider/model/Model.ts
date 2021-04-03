import defaultOptions from '../defaultOptions';
import Observer from '../observer/Observer';
import IModelOptions from '../interfaces/IModelOptions';

const has = require('has');

class Model extends Observer {
  private modelOptions: IModelOptions;

  constructor(modelOptions: IModelOptions) {
    super();
    this.modelOptions = this._getConfirmedOptions(modelOptions);
  }

  getOptions = () => this.modelOptions;

  updateOptions = (newOptions: IModelOptions) => {
    this.modelOptions = this._getConfirmedOptions(newOptions);
    this.notify('modelOptionsUpdate', this.modelOptions);
  };

  private _getConfirmedOptions = (checkingOptions: IModelOptions) => {
    const confirmedOptions = { ...checkingOptions };
    const {
      currentValues, range, step, rulerStep,
    } = confirmedOptions;
    const isCurrentValuesNan = Number.isNaN(currentValues.min) || Number.isNaN(currentValues.max);
    const isRangeNan = Number.isNaN(range.min) || Number.isNaN(range.max);
    const isStepNan = Number.isNaN(step);
    const isRange = has(currentValues, 'max');

    if (isRangeNan) {
      confirmedOptions.range.min = defaultOptions.range.min;
      confirmedOptions.range.max = defaultOptions.range.max;
    }

    if (isCurrentValuesNan) {
      confirmedOptions.currentValues.min = defaultOptions.currentValues.min;
      if (isRange) {
        confirmedOptions.currentValues.max = range.max;
      }
    }

    if (isStepNan || step <= 0) {
      confirmedOptions.step = defaultOptions.step;
    }

    if (rulerStep !== undefined) {
      if (rulerStep < step) {
        confirmedOptions.rulerStep = step;
      }

      const isMultipleStep = rulerStep % step === 0;

      if (!isMultipleStep) {
        confirmedOptions.rulerStep = step;
      }
    }

    if (range.min > range.max) {
      confirmedOptions.range.min = range.max;
    }

    if (currentValues.min < range.min) {
      confirmedOptions.currentValues.min = range.min;
    }

    if (currentValues.max > range.max) {
      confirmedOptions.currentValues.max = range.max;
    }

    if (currentValues.min > range.max) {
      confirmedOptions.currentValues.min = range.max;
    }

    if (currentValues.max < range.min) {
      confirmedOptions.currentValues.max = range.min;
    }

    if (currentValues.max < currentValues.min) {
      currentValues.min = range.min;
      currentValues.max = range.max;
    }

    return confirmedOptions;
  };
}

export default Model;
