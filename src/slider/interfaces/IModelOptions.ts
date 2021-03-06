import CurrentValues from './types';

interface IModelOptions {
  currentValues: CurrentValues;
  range: { min: number; max: number };
  withRuler: boolean;
  withThumb: boolean;
  step: number;
  rulerStep?: number;
  orientation: 'horizontal' | 'vertical';
  maxDecimalPlace?: number;
}

export default IModelOptions;
