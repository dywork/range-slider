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
  decimal: number;
  orientation: string;
}

interface IClickCoord {
  x: number;
  y: number;
}

class View extends Observer implements IView {
  private viewOptions: IViewOptions;

  private modelOptions: IModelOptions;

  private domParent: HTMLElement;

  private slider: HTMLDivElement;

  private bar: HTMLDivElement;

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
    this.setListeners();
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
    const isVertical = this.viewOptions.orientation === 'vertical';
    if (isVertical) sliderContainer.classList.add(sliderClassName.sliderVertical);
    const templateOptions = {
      sliderClassName,
      currentValue: this.modelOptions.currentValue,
      scalePosition: this.getScalePosition(),
      togglePosition: this.getTogglePosition(),
      isThumb: this.viewOptions.isThumb,
    };
    sliderContainer.innerHTML = sliderTemplate(templateOptions);
    return sliderContainer;
  };

  private saveDomElement = () => {
    this.slider = this.domParent.querySelector(`.${sliderClassName.slider}`);
    this.bar = this.domParent.querySelector(`.${sliderClassName.bar}`);
    this.scale = this.domParent.querySelector(`.${sliderClassName.scale}`);
    this.toggle = this.domParent.querySelector(`.${sliderClassName.toggle}`);
    this.handle = this.domParent.querySelector(`.${sliderClassName.handle}`);
    if (this.viewOptions.isThumb) {
      this.thumb = this.domParent.querySelector(`.${sliderClassName.thumb}`);
    }
  };

  private redrawValue = () => {
    const { currentValue, step } = this.modelOptions;
    const { isThumb } = this.viewOptions;
    let scalePosition = this.percentOfSliderWidth;
    let togglePercent = this.percentOfSliderWidth * 1000;

    if (isThumb) {
      this.thumb.textContent = `${currentValue}`;
    }

    if (step) {
      scalePosition = this.getScalePosition();
      togglePercent = this.getTogglePosition();
    }

    this.handle.setAttribute('value', `${currentValue}`);
    const isVertical = this.viewOptions.orientation === 'vertical';
    if (isVertical) {
      this.scale.setAttribute('style', `transform: scale(1, ${scalePosition});`);
      this.toggle.setAttribute('style', `transform: translate(0px, ${togglePercent}%);`);
    } else {
      this.scale.setAttribute('style', `transform: scale(${scalePosition}, 1);`);
      this.toggle.setAttribute('style', `transform: translate(${togglePercent}%, 0px);`);
    }
  };

  private dispatchSliderOptions = (newSliderOptions: IModelOptions) => {
    this.notify('sliderOptionsUpdate', newSliderOptions);
  };

  private setListeners = () => {
    this.bar.addEventListener('mousedown', this.onBarMouseDown);
    this.handle.addEventListener('mousedown', this.onToggleMouseDown);
  };

  changeCurrentValue = (clickCoord: IClickCoord) => {
    const isVertical = this.viewOptions.orientation === 'vertical';
    if (isVertical) {
      const cleanCoordY = this.getCleanCoordY(clickCoord.y);
      this.percentOfSliderWidth = this.getPercentOfSliderHeight(cleanCoordY);
      const newCurrentValue = this.getCurrentValueByPercent(this.percentOfSliderWidth);
      const newModelOptions = this.modelOptions;
      newModelOptions.currentValue = newCurrentValue;
      this.dispatchSliderOptions(newModelOptions);
    } else {
      const cleanCoordX = this.getCleanCoordX(clickCoord.x);
      this.percentOfSliderWidth = this.getPercentOfSliderWidth(cleanCoordX);
      const newCurrentValue = this.getCurrentValueByPercent(this.percentOfSliderWidth);
      const newModelOptions = this.modelOptions;
      newModelOptions.currentValue = newCurrentValue;
      this.dispatchSliderOptions(newModelOptions);
    }
  };

  private getScalePosition = () => {
    const { currentValue, range } = this.modelOptions;
    const scalePosition = (currentValue - range.min) / (range.max - range.min);
    return scalePosition;
  };

  private getTogglePosition = () => {
    const togglePosition = this.getScalePosition() * 1000;
    return togglePosition;
  };

  private getPercentOfSliderWidth = (value: number) => {
    let percent = value / this.slider.offsetWidth;
    if (percent > 1) percent = 1;
    if (percent < 0) percent = 0;
    return percent;
  };

  private getPercentOfSliderHeight = (value: number) => {
    let percent = value / this.slider.offsetHeight;
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

  private getCleanCoordY = (clickPageY: number) => {
    const halfHandleWidth = this.handle.offsetWidth / 2;
    const leftToggleMargin = 5;
    const cleanCoordY = clickPageY - this.slider.offsetTop - halfHandleWidth + leftToggleMargin;
    return cleanCoordY;
  };

  private getCurrentValueByPercent = (percent: number) => {
    const { range, step } = this.modelOptions;
    const { decimal } = this.viewOptions;
    const newCurrentValue = percent * (range.max - range.min) + range.min;
    if (step) {
      return this.getStepCurrentValue(newCurrentValue);
    }

    return +newCurrentValue.toFixed(decimal);
  };

  private getStepCurrentValue = (currentValue: number) => {
    const { step, range } = this.modelOptions;
    let stepCurrentValue = Math.round((currentValue - range.min) / step) * step + range.min;
    const isLastStepLess = +currentValue.toFixed() - range.max === 0;

    if (isLastStepLess) {
      stepCurrentValue = range.max;
    }

    if (stepCurrentValue >= range.max) {
      stepCurrentValue = range.max;
    }

    return stepCurrentValue;
  };

  private onBarMouseDown = (evt: MouseEvent) => {
    evt.preventDefault();
    this.changeCurrentValue({ x: evt.pageX, y: evt.pageY });
    document.addEventListener('mousemove', this.onToggleMove);
    document.addEventListener('mouseup', this.onToggleUp);
  };

  private onToggleMouseDown = (evt: MouseEvent) => {
    evt.preventDefault();
    document.addEventListener('mousemove', this.onToggleMove);
    document.addEventListener('mouseup', this.onToggleUp);
  };

  private onToggleMove = (evt: MouseEvent) => {
    evt.preventDefault();
    this.changeCurrentValue({ x: evt.pageX, y: evt.pageY });
  };

  private onToggleUp = (evt: MouseEvent) => {
    evt.preventDefault();
    document.removeEventListener('mousemove', this.onToggleMove);
    document.removeEventListener('mouseup', this.onToggleUp);
  };
}

export { View, IViewOptions };
