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
    const isCurrentValuesNan = Number.isNaN(currentValues.min) || Number.isNaN(currentValues.max);
    const isRangeNan = Number.isNaN(range.min) || Number.isNaN(range.max);
    const isStepNan = Number.isNaN(step);
    const isRange = Object.hasOwnProperty.call(currentValues, 'max');

    if (isRangeNan) {
      confirmedOptions.range = defaultOptions.range;
    }

    if (isCurrentValuesNan) {
      confirmedOptions.currentValues = defaultOptions.currentValues;
      if (isRange) {
        confirmedOptions.currentValues.max = range.max;
      }
    }

    if (isStepNan) {
      confirmedOptions.step = defaultOptions.step;
    }

    if (step <= 0) {
      confirmedOptions.step = defaultOptions.step;
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

  private _getConfirmedSoloCurrentValues = (currentValues: { min: number; max?: number }) => {
    const confirmedCurrentValues = { ...currentValues };
    const { min } = confirmedCurrentValues;
    const isCurrentValueNan = Number.isNaN(min);

    if (isCurrentValueNan) {
      const { currentValues: defaultCurrentValues } = defaultOptions;
      confirmedCurrentValues.min = defaultCurrentValues.min;
    }

    return confirmedCurrentValues;
  };

  private _getConfirmedRangeCurrentValues = (currentValues: { min: number; max?: number }) => {
    const confirmedCurrentValues = { ...currentValues };
    const { min, max } = confirmedCurrentValues;
    const isCurrentValuesNan = Number.isNaN(min) || Number.isNaN(max);

    if (isCurrentValuesNan) {
      const { currentValues: defaultCurrentValues, range: defaultRange } = defaultOptions;
      confirmedCurrentValues.min = defaultCurrentValues.min;
      confirmedCurrentValues.max = defaultRange.max;
    }

    return confirmedCurrentValues;
  };
}

export default Model;
