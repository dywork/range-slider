interface IRulerProps {
  step: number;
  range: { min: number; max: number };
  withRuler: boolean;
  isVertical: boolean;
  maxDecimalPlace: number;
}

export default IRulerProps;
