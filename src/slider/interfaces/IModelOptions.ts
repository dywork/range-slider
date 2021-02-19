interface IModelOptions {
  currentValues: number[];
  range: { min: number; max: number };
  isRuler: boolean;
  isThumb: boolean;
  step: number;
  orientation: string;
}

export default IModelOptions;
