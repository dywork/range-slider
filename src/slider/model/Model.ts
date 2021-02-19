import defaultOptions from '../defaultOptions';
import Observer from '../observer/Observer';
import IModelOptions from '../interfaces/IModelOptions';

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
    const { currentValues, range, step } = confirmedOptions;
    const isCurrentValuesNan = Number.isNaN(currentValues[0]) || Number.isNaN(currentValues[1]);
    const isRangeNan = Number.isNaN(range.min) || Number.isNaN(range.max);
    const isStepNan = Number.isNaN(step);
    const isDiapason = currentValues.length === 2;

    if (isCurrentValuesNan) {
      confirmedOptions.currentValues = defaultOptions.currentValues;
      if (isDiapason) {
        confirmedOptions.currentValues[1] = range.max;
      }
    }

    if (isRangeNan) {
      confirmedOptions.range = defaultOptions.range;
    }

    if (isStepNan) {
      confirmedOptions.step = defaultOptions.step;
    }

    if (range.min > range.max) {
      confirmedOptions.range.min = range.max;
    }

    if (currentValues[0] < range.min) {
      confirmedOptions.currentValues[0] = range.min;
    }

    if (currentValues[1] > range.max) {
      confirmedOptions.currentValues[1] = range.max;
    }

    if (currentValues[0] > range.max) {
      confirmedOptions.currentValues[0] = range.max;
    }

    if (currentValues[1] < range.min) {
      confirmedOptions.currentValues[1] = range.min;
    }

    if (currentValues[1] < currentValues[0]) {
      currentValues[0] = range.min;
      currentValues[1] = range.max;
    }

    return confirmedOptions;
  };
}

export default Model;
