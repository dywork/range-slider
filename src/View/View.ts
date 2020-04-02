import Observer from '../Observer/Observer';
import ISliderOptions from '../interfaces/ISliderOptions';

const sliderTemplate = require('./template/sliderTemplate.hbs');

interface IView {
  render(): void;
}

class View extends Observer implements IView {
  private domParent: HTMLElement;

  private viewOptions: ISliderOptions;

  constructor(domParent: HTMLElement, viewOptions: ISliderOptions) {
    super();
    this.domParent = domParent;
    this.viewOptions = viewOptions;
  }

  redrawValue = (sliderOptions: ISliderOptions) => {
    console.log(sliderOptions);
  };

  render() {
    this.fixOverflow();
    const sliderContainer = this.createSliderContainer();
    this.domParent.appendChild(sliderContainer);
  }

  private fixOverflow = () => {
    const isHaveClass = document.body.classList.contains('range-slider-overflow');
    if (!isHaveClass) {
      document.body.classList.add('range-slider-overflow');
    }
  };

  private createSliderContainer = () => {
    const sliderContainer = document.createElement('div');
    sliderContainer.classList.add('range-slider');
    const templateOptions = {
      currentValue: this.viewOptions.currentValue,
      scaleWidth: this.getScaleWidth(),
      togglePosition: this.viewOptions.currentValue,
    };
    sliderContainer.innerHTML = sliderTemplate(templateOptions);
    return sliderContainer;
  };

  private getScaleWidth = () => {
    const { currentValue } = this.viewOptions;
    const scaleWidth = currentValue / 1000;
    return scaleWidth;
  };
}

export default View;
