import IModelOptions from './interfaces/IModelOptions';

const defaultOptions: IModelOptions = {
  currentValues: [10],
  range: {
    min: 10,
    max: 30,
  },
  isThumb: true,
  isRuler: false,
  step: 1,
  orientation: 'horizontal',
};

export default defaultOptions;
