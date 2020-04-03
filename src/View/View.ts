import Observer from '../Observer/Observer';
import ISliderOptions from '../interfaces/ISliderOptions';
import sliderClassName from './sliderClassName';

const sliderTemplate = require('./template/sliderTemplate.hbs');

interface IView {
  render(): void;
}

class View extends Observer implements IView {
  private domParent: HTMLElement;

  private viewOptions: ISliderOptions;

  private slider: HTMLDivElement;

  private scale: HTMLDivElement;

  private toggle: HTMLDivElement;

  private handle: HTMLDivElement;

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
    this.mountSlider();
    this.saveDomElement();
  }

  private fixOverflow = () => {
    const isHaveClass = document.body.classList.contains('range-slider-overflow');
    if (!isHaveClass) {
      document.body.classList.add('range-slider-overflow');
    }
  };

  private mountSlider = () => {
    const sliderContainer = this.createSliderContainer();
    this.domParent.appendChild(sliderContainer);
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

  private saveDomElement = () => {
    this.slider = this.domParent.querySelector(`.${sliderClassName.slider}`);
    this.scale = this.domParent.querySelector(`.${sliderClassName.scale}`);
    this.toggle = this.domParent.querySelector(`.${sliderClassName.toggle}`);
    this.handle = this.domParent.querySelector(`.${sliderClassName.handle}`);
  };

  private getScaleWidth = () => {
    const { currentValue } = this.viewOptions;
    const scaleWidth = currentValue / 1000;
    return scaleWidth;
  };
}

export default View;
