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

  private percentOfSliderWidth: number;

  constructor(domParent: HTMLElement, viewOptions: ISliderOptions) {
    super();
    this.domParent = domParent;
    this.viewOptions = viewOptions;
  }

  updateSliderOptions = (newSliderOptions: ISliderOptions) => {
    this.viewOptions = newSliderOptions;
    this.redrawValue();
  };

  render = () => {
    this.fixOverflow();
    this.mountSlider();
    this.saveDomElement();
    this.setToggleListener();
  };

  private fixOverflow = () => {
    const isHaveClass = document.body.classList.contains(sliderClassName.overflowFix);
    if (!isHaveClass) {
      document.body.classList.add(sliderClassName.overflowFix);
    }
  };

  private mountSlider = () => {
    const sliderContainer = this.createSliderContainer();
    this.domParent.appendChild(sliderContainer);
  };

  private createSliderContainer = () => {
    const sliderContainer = document.createElement('div');
    sliderContainer.classList.add(sliderClassName.slider);
    const templateOptions = {
      sliderClassName,
      currentValue: this.viewOptions.currentValue,
      scaleWidth: this.getStartScaleWidth(),
      togglePosition: this.getStartTogglePosition(),
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

  private redrawValue = () => {
    const togglePercent = this.percentOfSliderWidth * 1000;
    this.scale.setAttribute('style', `transform: scale(${this.percentOfSliderWidth}, 1);`);
    this.toggle.setAttribute('style', `transform: translate(${togglePercent}%, 0px);`);
    this.handle.setAttribute('value', `${this.viewOptions.currentValue}`);
  };

  private dispatchSliderOptions = (newSliderOptions: ISliderOptions) => {
    this.notify('sliderOptionsUpdate', newSliderOptions);
  };

  private setToggleListener = () => {
    this.handle.addEventListener('mousedown', this.onToggleMouseDown);
  };

  private getStartScaleWidth = () => {
    const { currentValue, range } = this.viewOptions;
    const { min, max } = range;
    const scaleWidth = (currentValue - min) / (max - min);
    return scaleWidth;
  };

  private getStartTogglePosition = () => {
    const togglePosition = this.getStartScaleWidth() * 1000;
    return togglePosition;
  };

  private getPercentOfSliderWidth = (value: number) => {
    let percent = value / this.slider.offsetWidth;
    if (percent > 1) percent = 1;
    if (percent < 0) percent = 0;
    return percent;
  };

  private getCleanCoordX = (clickPageX: number) => {
    const halfHandleWidth = this.handle.offsetWidth / 2;
    const leftToggleMargin = 7;
    const cleanCoordX = clickPageX - this.slider.offsetLeft - halfHandleWidth + leftToggleMargin;
    return cleanCoordX;
  };

  private getCurrentValueByPercent = (percent: number) => {
    const { range } = this.viewOptions;
    const { min, max } = range;
    const newCurrentValue = percent * (max - min) + min;
    const decimal = 2;
    return +newCurrentValue.toFixed(decimal);
  };

  private onToggleMouseDown = (evt: MouseEvent) => {
    evt.preventDefault();

    const onMouseMove = (moveEvt: MouseEvent) => {
      moveEvt.preventDefault();
      const cleanCoordX = this.getCleanCoordX(moveEvt.pageX);
      this.percentOfSliderWidth = this.getPercentOfSliderWidth(cleanCoordX);
      const newCurrentValue = this.getCurrentValueByPercent(this.percentOfSliderWidth);
      const newViewOptions = this.viewOptions;
      newViewOptions.currentValue = newCurrentValue;
      this.dispatchSliderOptions(newViewOptions);
    };

    const onMouseUp = (upEvt: MouseEvent) => {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };
}

export default View;
