interface IModelOptions {
  currentValues: { min: number; max?: number };
  range: { min: number; max: number };
  withRuler: boolean;
  withThumb: boolean;
  step: number;
  orientation: 'horizontal' | 'vertical';
}

export default IModelOptions;
