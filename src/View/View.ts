interface IView {
  renderCurrentValue(): void;
  renderMinValue(): void;
  renderMaxValue(): void;
  render(): void;
}

interface IViewOptions {
  currentValue: number;
  minValue: number;
  maxValue: number;
}

class View implements IView {
  private viewOptions: IViewOptions;

  constructor(viewOptions: IViewOptions) {
    this.viewOptions = viewOptions;
  }
}

export default View;
