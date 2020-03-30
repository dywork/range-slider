import Observer from '../Observer/Observer';
import ISliderOptions from '../interfaces/ISliderOptions';

const sliderTemplate = require('./template/sliderTemplate.hbs');

interface IView {
  render(): void;
}

class View extends Observer implements IView {
  private viewOptions: ISliderOptions;

  private viewMinValue: HTMLSpanElement;

  private viewMaxValue: HTMLSpanElement;

  private viewCurrentValue: HTMLSpanElement;

  constructor(viewOptions: ISliderOptions) {
    super();
    this.viewOptions = viewOptions;
  }

  redrawValue = (sliderOptions: ISliderOptions) => {
    const minValue = this.viewOptions.range.min;
    this.viewMinValue.textContent = `${minValue}`;
    const maxValue = this.viewOptions.range.max;
    this.viewMaxValue.textContent = `${maxValue}`;
    this.viewCurrentValue.textContent = `${sliderOptions.currentValue}`;
  };

  render = () => {
    const sliderView = document.createElement('div');
    sliderView.innerHTML = sliderTemplate({
      currentValue: this.viewOptions.currentValue,
      range: this.viewOptions.range,
    });
    document.body.appendChild(sliderView);
    const minusBtn = document.querySelector('#rangeSliderBtnMinus');
    const plusBtn = document.querySelector('#rangeSliderBtnPlus');
    minusBtn.addEventListener('click', this.onClickMinus);
    plusBtn.addEventListener('click', this.onClickPlus);
    this.viewMinValue = document.querySelector('#sliderMinValue');
    this.viewMaxValue = document.querySelector('#sliderMaxValue');
    this.viewCurrentValue = document.querySelector('#sliderCurrentValue');
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
}

export default View;
