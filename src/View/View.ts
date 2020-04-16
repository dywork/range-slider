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

  private isVertical: boolean;

  private slider: HTMLDivElement;

  private bar: HTMLDivElement;

  private scale: HTMLDivElement;

  private toggle: HTMLDivElement;

  private handle: HTMLDivElement;

  private thumb?: HTMLDivElement;

  constructor(viewOptions: IViewOptions, modelOptions: IModelOptions) {
    super();
    this.viewOptions = viewOptions;
    this.modelOptions = modelOptions;
    this.domParent = this.viewOptions.domParent;
    this.isVertical = this.viewOptions.orientation === 'vertical';
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

    if (this.isVertical) {
      sliderContainer.classList.add(sliderClassName.sliderVertical);
    }

    const templateOptions = {
      sliderClassName,
      currentValue: this.modelOptions.currentValue,
      scaleTransformStyle: this.getScaleTransformStyle(),
      toggleTransformStyle: this.getToggleTransformStyle(),
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
    const { currentValue } = this.modelOptions;
    const { isThumb } = this.viewOptions;

    if (isThumb) {
      this.thumb.textContent = `${currentValue}`;
    }

    this.handle.setAttribute('value', `${currentValue}`);
    this.scale.setAttribute('style', this.getScaleTransformStyle());
    this.toggle.setAttribute('style', this.getToggleTransformStyle());
  };

  private dispatchSliderOptions = (newSliderOptions: IModelOptions) => {
    this.notify('sliderOptionsUpdate', newSliderOptions);
  };

  private setListeners = () => {
    this.bar.addEventListener('mousedown', this.onBarMouseDown);
    this.handle.addEventListener('mousedown', this.onToggleMouseDown);
  };

  private changeCurrentValue = (clickCoord: IClickCoord) => {
    const cleanCoord = this.getCleanCoord(clickCoord);
    const percentOfSlider = this.getPercent(cleanCoord);
    const newCurrentValue = this.getCurrentValueByPercent(percentOfSlider);
    const newModelOptions = this.modelOptions;
    newModelOptions.currentValue = newCurrentValue;
    this.dispatchSliderOptions(newModelOptions);
  };

  private getScaleTransformStyle = () => {
    const scalePosition = this.getScalePosition();

    if (this.isVertical) {
      return `transform: scale(1, ${scalePosition});`;
    }

    return `transform: scale(${scalePosition}, 1);`;
  };

  private getToggleTransformStyle = () => {
    const togglePosition = this.getTogglePosition();

    if (this.isVertical) {
      return `transform: translate(0px, ${togglePosition}%);`;
    }

    return `transform: translate(${togglePosition}%, 0px);`;
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

  private getPercent = (value: number) => {
    const offset = this.isVertical ? this.slider.offsetHeight : this.slider.offsetWidth;
    let percent = value / offset;
    if (percent > 1) percent = 1;
    if (percent < 0) percent = 0;
    return percent;
  };

  private getCleanCoord = (clickCoord: IClickCoord) => {
    const halfHandleWidth = this.handle.offsetWidth / 2;
    const leftToggleMargin = this.isVertical ? 5 : 7;
    const sliderOffset = this.isVertical ? this.slider.offsetTop : this.slider.offsetLeft;
    const cleanCoord = this.isVertical
      ? clickCoord.y - sliderOffset - halfHandleWidth + leftToggleMargin
      : clickCoord.x - sliderOffset - halfHandleWidth + leftToggleMargin;
    return cleanCoord;
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
