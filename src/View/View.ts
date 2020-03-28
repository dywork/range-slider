interface IView {
  getViewCurrentValue(): void;
  getViewMinValue(): void;
  getViewMaxValue(): void;
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
    const paragraph = document.createElement('p');
    paragraph.textContent = `Текущее значение: ${this.viewOptions.currentValue}`;
    document.body.appendChild(paragraph);
  };
}

export default View;
