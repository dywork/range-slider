interface IModelOptions {
  currentValues: [number] | [number, number];
  range: { min: number; max: number };
  withRuler: boolean;
  withThumb: boolean;
  step: number;
  orientation: 'horizontal' | 'vertical';
}

export default IModelOptions;
