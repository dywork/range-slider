import IModelOptions from './interfaces/IModelOptions';

const defaultOptions: IModelOptions = {
  currentValues: { min: 10 },
  range: {
    min: 10,
    max: 30,
  },
  withThumb: true,
  withRuler: false,
  step: 1,
  orientation: 'horizontal',
  maxDecimalPlace: 1,
};

export default defaultOptions;
