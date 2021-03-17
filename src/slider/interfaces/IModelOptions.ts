import CurrentValues from './types';

interface IModelOptions {
  currentValues: CurrentValues;
  range: { min: number; max: number };
  withRuler: boolean;
  withThumb: boolean;
  step: number;
  orientation: 'horizontal' | 'vertical';
}

export default IModelOptions;
