import Observer from '../Observer/Observer';
import ISliderOptions from '../interfaces/ISliderOptions';

interface IView {
  render(): void;
}

class View extends Observer implements IView {
  private viewOptions: ISliderOptions;

  constructor(viewOptions: ISliderOptions) {
    super();
    this.viewOptions = viewOptions;
  }

  redrawValue = (sliderOptions: ISliderOptions) => {
    const viewMinValue = document.querySelector('#viewMinValue');
    const minValue = this.viewOptions.range.min;
    viewMinValue.textContent = `Минимальное значение: ${minValue}`;
    const viewMaxValue = document.querySelector('#viewMaxValue');
    const maxValue = this.viewOptions.range.max;
    viewMaxValue.textContent = `Максимальное значение: ${maxValue}`;
    const viewCurrentValue = document.querySelector('#viewCurrentValue');
    viewCurrentValue.textContent = `Текущее значение: ${sliderOptions.currentValue}`;
  };

  render = () => {
    const viewMinValue = this.getViewMinValue();
    viewMinValue.id = 'viewMinValue';
    const viewMaxValue = this.getViewMaxValue();
    viewMaxValue.id = 'viewMaxValue';
    const viewCurrentValue = this.getViewCurrentValue();
    viewCurrentValue.id = 'viewCurrentValue';
    const minusBtn = this.getBtn('-');
    minusBtn.addEventListener('click', this.onClickMinus);
    const plusBtn = this.getBtn('+');
    plusBtn.addEventListener('click', this.onClickPlus);
    document.body.appendChild(viewMinValue);
    document.body.appendChild(viewMaxValue);
    document.body.appendChild(viewCurrentValue);
    document.body.appendChild(minusBtn);
    document.body.appendChild(plusBtn);
  };

  private onClickMinus = (evt: Event) => {
    evt.preventDefault();
    const newCurrentValue = this.viewOptions.currentValue - 1;
    const sliderOptions = this.viewOptions;
    sliderOptions.currentValue = newCurrentValue;
    this.notify('sliderOptionsUpdate', this.viewOptions);
  };

  private onClickPlus = (evt: Event) => {
    evt.preventDefault();
    const newCurrentValue = this.viewOptions.currentValue + 1;
    const sliderOptions = this.viewOptions;
    sliderOptions.currentValue = newCurrentValue;
    this.notify('sliderOptionsUpdate', this.viewOptions);
  };

  private getViewCurrentValue = () => {
    const viewCurrentValue = document.createElement('p');
    viewCurrentValue.textContent = `Текущее значение: ${this.viewOptions.currentValue}`;
    return viewCurrentValue;
  };

  private getViewMinValue = () => {
    const viewMinValue = document.createElement('p');
    const minValue = this.viewOptions.range.min;
    viewMinValue.textContent = `Минимальное значение: ${minValue}`;
    return viewMinValue;
  };

  private getViewMaxValue = () => {
    const viewMaxValue = document.createElement('p');
    const maxValue = this.viewOptions.range.max;
    viewMaxValue.textContent = `Максимальное значение: ${maxValue}`;
    return viewMaxValue;
  };

  private getBtn = (btnName: string) => {
    const btn = document.createElement('button');
    btn.textContent = btnName;
    return btn;
  };
}

export default View;
