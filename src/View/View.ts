interface IView {
  getViewCurrentValue(): HTMLParagraphElement;
  getViewMinValue(): HTMLParagraphElement;
  getViewMaxValue(): HTMLParagraphElement;
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

  getViewCurrentValue = () => {
    const viewCurrentValue = document.createElement('p');
    viewCurrentValue.textContent = `Текущее значение: ${this.viewOptions.currentValue}`;
    return viewCurrentValue;
  };

  getViewMinValue = () => {
    const viewMinValue = document.createElement('p');
    viewMinValue.textContent = `Минимальное значение: ${this.viewOptions.minValue}`;
    return viewMinValue;
  };
}

export default View;
