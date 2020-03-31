import Observer from '../Observer/Observer';
import ISliderOptions from '../interfaces/ISliderOptions';

const sliderTemplate = require('./template/sliderTemplate.hbs');

interface IView {
  render(): void;
}

class View extends Observer implements IView {
  private viewOptions: ISliderOptions;

  private viewCurrentValue: HTMLInputElement;

  constructor(viewOptions: ISliderOptions) {
    super();
    this.viewOptions = viewOptions;
  }

  redrawValue = (sliderOptions: ISliderOptions) => {
    this.viewCurrentValue.value = `${sliderOptions.currentValue}`;
  };

  render = () => {
    const sliderView = document.createElement('div');
    sliderView.innerHTML = sliderTemplate({
      currentValue: this.viewOptions.currentValue,
    });
    document.body.appendChild(sliderView);
    const minusBtn = document.querySelector('#rangeSliderBtnMinus');
    const plusBtn = document.querySelector('#rangeSliderBtnPlus');
    minusBtn.addEventListener('click', this.onClickMinus);
    plusBtn.addEventListener('click', this.onClickPlus);
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
