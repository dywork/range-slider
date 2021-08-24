import has from 'has';
import defaultOptions from '../defaultOptions';
import Observer from '../observer/Observer';
import ObserverEvents from '../observer/ObserverEvents';
import IModelOptions from '../interfaces/IModelOptions';

class Model extends Observer {
  private modelOptions: IModelOptions;

  constructor(modelOptions: IModelOptions) {
    super();
    this.modelOptions = this.getConfirmedOptions(modelOptions);
  }

  getOptions = () => this.modelOptions;

  updateOptions = (newOptions: IModelOptions) => {
    this.modelOptions = this.getConfirmedOptions(newOptions);
    this.notify(ObserverEvents.modelOptionsUpdate, this.modelOptions);
  };

  private getConfirmedOptions = (checkingOptions: IModelOptions): IModelOptions => {
    const confirmedOptions = { ...checkingOptions };
    const { currentValues, range, step } = confirmedOptions;
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

    const isStepInvalid = isStepNan || step <= 0;
    if (isStepInvalid) {
      confirmedOptions.step = defaultOptions.step;
    }

    const isStepMoreThenRangeMax = !isStepInvalid && step > range.max;
    if (isStepMoreThenRangeMax) {
      confirmedOptions.step = range.max;
    }

    if (range.min > range.max) {
      confirmedOptions.range.min = range.max;
    }

    if (currentValues.min < range.min) {
      confirmedOptions.currentValues.min = range.min;
    }

    const maxValueMoreThenRangeMax = isRange && currentValues.max! > range.max;
    if (maxValueMoreThenRangeMax) {
      confirmedOptions.currentValues.max = range.max;
    }

    if (currentValues.min > range.max) {
      confirmedOptions.currentValues.min = range.max;
    }

    const maxValueLessThenRangeMax = isRange && currentValues.max! < range.min;
    if (maxValueLessThenRangeMax) {
      confirmedOptions.currentValues.max = range.min;
    }

    const maxValueLessThenMinValue = isRange && currentValues.max! < currentValues.min;
    if (maxValueLessThenMinValue) {
      currentValues.min = range.min;
      currentValues.max = range.max;
    }

    return confirmedOptions;
  };
}

export default Model;
