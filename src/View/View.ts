import { IRange } from '../types/options';

interface IView {
  render(): void;
}

interface IViewOptions {
  start: number;
  range: IRange;
  currentValue: number;
}

class View implements IView {
  private options: IViewOptions;

  constructor(options: IViewOptions) {
    this.options = options;
  }

  render = () => {
    const startHTML = document.createElement('p');
    startHTML.textContent = `начальное значение: ${this.options.start}`;
    document.body.appendChild(startHTML);
    const p = document.createElement('p');
    p.textContent = `рейндж: ${this.options.range.min} --- ${this.options.range.max}`;
    document.body.appendChild(p);
    const currentValueP = document.createElement('p');
    currentValueP.textContent = `Текущее значение: ${this.options.currentValue}`;
    document.body.appendChild(currentValueP);
  };
}

export { View, IView };
