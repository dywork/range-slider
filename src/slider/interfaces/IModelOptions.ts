interface IModelOptions {
  currentValues: [number] | [number, number];
  range: { min: number; max: number };
  withRuler: boolean;
  isThumb: boolean;
  step: number;
  orientation: 'horizontal' | 'vertical';
}

export default IModelOptions;
