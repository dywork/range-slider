interface ISliderOptions {
  domParent: HTMLElement;
  currentValue: number | number[];
  range: { min: number; max: number };
  isRuler: boolean;
  isThumb: boolean;
  step: number;
  decimal: number;
  orientation: string;
}

export default ISliderOptions;
