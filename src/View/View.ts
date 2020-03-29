import Observer from '../Observer/Observer';

interface IView {
  render(): void;
}

interface IViewOptions {
  currentValue: number;
  minValue: number;
  maxValue: number;
}

class View extends Observer implements IView {
  private viewOptions: IViewOptions;

  constructor(viewOptions: IViewOptions) {
    super();
    this.viewOptions = viewOptions;
  }

  private getViewCurrentValue = () => {
    const viewCurrentValue = document.createElement('p');
    viewCurrentValue.textContent = `Текущее значение: ${this.viewOptions.currentValue}`;
    return viewCurrentValue;
  };

  private getViewMinValue = () => {
    const viewMinValue = document.createElement('p');
    viewMinValue.textContent = `Минимальное значение: ${this.viewOptions.minValue}`;
    return viewMinValue;
  };

  private getViewMaxValue = () => {
    const viewMaxValue = document.createElement('p');
    viewMaxValue.textContent = `Максимальное значение: ${this.viewOptions.maxValue}`;
    return viewMaxValue;
  };

  render = () => {
    const viewMinValue = this.getViewMinValue();
    const viewMaxValue = this.getViewMaxValue();
    const viewCurrentValue = this.getViewCurrentValue();
    document.body.appendChild(viewMinValue);
    document.body.appendChild(viewMaxValue);
    document.body.appendChild(viewCurrentValue);
  };
}

export { View, IView };
