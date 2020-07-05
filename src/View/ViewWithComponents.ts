import Observer from '../Observer/Observer';
import DoubleToggleView from './DoubleToggleView';
import IViewOptions from './IViewOptions';
import { IModelOptions } from '../Model/Model';
import sliderClassName from './sliderClassName';
import Toggle from './components/Toggle/Toggle';
import Thumb from './components/Thumb/Thumb';

const sliderTemplate = require('./template/sliderTemplate.hbs');

interface IView {
  render(): void;
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

  private isDouble: boolean;

  private slider: HTMLDivElement;

  private bar: HTMLDivElement;

  private scale: HTMLDivElement;

  private toggle: HTMLDivElement;

  private handle: HTMLDivElement;

  private thumb?: HTMLDivElement;

  private doubleToggle?: DoubleToggleView;

  constructor(viewOptions: IViewOptions, modelOptions: IModelOptions) {
    super();
    this.viewOptions = viewOptions;
    this.modelOptions = modelOptions;
    this.domParent = this.viewOptions.domParent;
    this.isVertical = this.viewOptions.orientation === 'vertical';
    this.isDouble = Array.isArray(this.modelOptions.currentValue);
    if (this.isDouble) {
      this.doubleToggle = new DoubleToggleView(viewOptions, modelOptions);
      this.doubleToggle.subscribe('sliderOptionsUpdate', this.dispatchSliderOptions);
    }
  }

  updateSliderOptions = (newSliderOptions: IModelOptions) => {
    this.modelOptions = newSliderOptions;
    if (this.isDouble) {
      this.doubleToggle.updateModelOptions(newSliderOptions);
    } else {
      this.redrawValue();
    }
  };

  render = () => {
    if (this.doubleToggle) {
      this.doubleToggle.render();
    } else {
      this.mountSlider();
      this.saveDomElement();
      this.renderFirstValue();
      this.setListeners();
      const toggle = new Toggle().getHtml();
      const thumb = new Thumb(this.modelOptions.currentValue).getHtml();
      toggle.appendChild(thumb);
      console.log(toggle);
    }
  };

  private mountSlider = () => {
    const sliderContainer = this.createSliderContainer();
    this.domParent.appendChild(sliderContainer);
  };

  private createSliderContainer = () => {
    const { isThumb } = this.viewOptions;
    const sliderContainer = document.createElement('div');
    sliderContainer.classList.add(sliderClassName.slider);

    if (this.isVertical) {
      sliderContainer.classList.add(sliderClassName.sliderVertical);
    }

    const templateOptions = { sliderClassName, isThumb };
    sliderContainer.innerHTML = sliderTemplate(templateOptions);
    return sliderContainer;
  };

  private renderFirstValue = () => {
    const { currentValue } = this.modelOptions;
    const { isThumb } = this.viewOptions;
    this.scale.setAttribute('style', this.getScaleTransformStyle());
    this.toggle.setAttribute('style', this.getToggleTransformStyle());
    this.handle.setAttribute('value', `${currentValue}`);
    if (isThumb) {
      this.thumb.textContent = `${currentValue}`;
    }
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
    const newModelOptions = { ...this.modelOptions };
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
    const scalePosition = (+currentValue - range.min) / (range.max - range.min);
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
    const interfering = sliderOffset - halfHandleWidth + leftToggleMargin;
    const cleanCoord = this.isVertical ? clickCoord.y - interfering : clickCoord.x - interfering;
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

export default View;