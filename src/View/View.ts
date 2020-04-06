import Observer from '../Observer/Observer';
import { IModelOptions } from '../Model/Model';
import sliderClassName from './sliderClassName';

const sliderTemplate = require('./template/sliderTemplate.hbs');

interface IView {
  render(): void;
}

interface IViewOptions {
  domParent: HTMLElement;
  isThumb: boolean;
}

class View extends Observer implements IView {
  private viewOptions: IViewOptions;

  private modelOptions: IModelOptions;

  private domParent: HTMLElement;

  private slider: HTMLDivElement;

  private scale: HTMLDivElement;

  private toggle: HTMLDivElement;

  private handle: HTMLDivElement;

  private thumb?: HTMLDivElement;

  private percentOfSliderWidth: number;

  constructor(viewOptions: IViewOptions, modelOptions: IModelOptions) {
    super();
    this.viewOptions = viewOptions;
    this.domParent = this.viewOptions.domParent;
    this.modelOptions = modelOptions;
  }

  updateSliderOptions = (newSliderOptions: IModelOptions) => {
    this.modelOptions = newSliderOptions;
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
      currentValue: this.modelOptions.currentValue,
      scaleWidth: this.getStartScaleWidth(),
      togglePosition: this.getStartTogglePosition(),
      isThumb: this.viewOptions.isThumb,
    };
    sliderContainer.innerHTML = sliderTemplate(templateOptions);
    return sliderContainer;
  };

  private saveDomElement = () => {
    this.slider = this.domParent.querySelector(`.${sliderClassName.slider}`);
    this.scale = this.domParent.querySelector(`.${sliderClassName.scale}`);
    this.toggle = this.domParent.querySelector(`.${sliderClassName.toggle}`);
    this.handle = this.domParent.querySelector(`.${sliderClassName.handle}`);
    if (this.viewOptions.isThumb) {
      this.thumb = this.domParent.querySelector(`.${sliderClassName.thumb}`);
    }
  };

  private redrawValue = () => {
    const togglePercent = this.percentOfSliderWidth * 1000;
    this.scale.setAttribute('style', `transform: scale(${this.percentOfSliderWidth}, 1);`);
    this.toggle.setAttribute('style', `transform: translate(${togglePercent}%, 0px);`);
    this.handle.setAttribute('value', `${this.modelOptions.currentValue}`);
    if (this.viewOptions.isThumb) {
      this.thumb.textContent = `${this.modelOptions.currentValue}`;
    }
  };

  private dispatchSliderOptions = (newSliderOptions: IModelOptions) => {
    this.notify('sliderOptionsUpdate', newSliderOptions);
  };

  private setToggleListener = () => {
    this.handle.addEventListener('mousedown', this.onToggleMouseDown);
  };

  private getStartScaleWidth = () => {
    const { currentValue, range } = this.modelOptions;
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
    const { range } = this.modelOptions;
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
      const newmodelOptions = this.modelOptions;
      newmodelOptions.currentValue = newCurrentValue;
      this.dispatchSliderOptions(newmodelOptions);
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

export { View, IViewOptions };
