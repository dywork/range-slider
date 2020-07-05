import Observer from '../Observer/Observer';
import IViewOptions from './IViewOptions';
import { IModelOptions } from '../Model/Model';
import sliderClassName from './sliderClassName';

const sliderTemplate = require('./template/sliderTemplate.hbs');

interface IToggle {
  currentValue: number;
  node: HTMLDivElement;
  handle: HTMLDivElement;
  thumb?: HTMLDivElement;
}

interface IClickCoord {
  x: number;
  y: number;
}

class DoubleToggle extends Observer {
  private viewOptions: IViewOptions;

  private modelOptions: IModelOptions;

  private domParent: HTMLElement;

  private isVertical: boolean;

  private slider: HTMLDivElement;

  private bar: HTMLDivElement;

  private scale: HTMLDivElement;

  private toggles: Array<IToggle>;

  private activeToggleIndex: number;

  constructor(viewOptions: IViewOptions, modelOptions: IModelOptions) {
    super();
    this.viewOptions = viewOptions;
    this.modelOptions = modelOptions;
    this.domParent = this.viewOptions.domParent;
    this.isVertical = this.viewOptions.orientation === 'vertical';
  }

  render = () => {
    this.mountSlider();
    this.saveDomElement();
    this.renderValue();
    this.setListeners();
  };

  updateModelOptions = (modelOptions: IModelOptions) => {
    this.modelOptions = modelOptions;
    this.redrawValue();
  };

  private redrawValue = () => {
    const { currentValue } = this.modelOptions;

    this.toggles.forEach((toggle: IToggle, index) => {
      if (currentValue instanceof Array) {
        // eslint-disable-next-line no-param-reassign
        toggle.currentValue = currentValue[index];
      }
    });

    this.renderValue();
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
      isDouble: true,
      isThumb: this.viewOptions.isThumb,
    };
    sliderContainer.innerHTML = sliderTemplate(templateOptions);
    return sliderContainer;
  };

  private saveDomElement = () => {
    this.slider = this.domParent.querySelector(`.${sliderClassName.slider}`);
    this.bar = this.domParent.querySelector(`.${sliderClassName.bar}`);
    this.scale = this.domParent.querySelector(`.${sliderClassName.scale}`);
    if (this.modelOptions.currentValue instanceof Array) {
      const { currentValue } = this.modelOptions;
      this.toggles = currentValue.map(this.getToggleObj);
    }
  };

  private getToggleObj = (currentValue: number, index: number) => {
    const { isThumb } = this.viewOptions;
    const node = <HTMLDivElement>(
      this.domParent.querySelectorAll(`.${sliderClassName.toggle}`)[index]
    );
    const handle = <HTMLDivElement>(
      this.domParent.querySelectorAll(`.${sliderClassName.handle}`)[index]
    );
    const thumb = isThumb
      ? <HTMLDivElement> this.domParent.querySelectorAll(`.${sliderClassName.thumb}`)[index]
      : null;

    return {
      currentValue,
      node,
      handle,
      thumb,
    };
  };

  private renderValue = () => {
    const currentValues: number[] = [];
    this.toggles.forEach((toggle: IToggle) => {
      // eslint-disable-next-line object-curly-newline
      const { currentValue, node, handle, thumb } = toggle;
      node.setAttribute('style', this.getToggleTransformStyle(currentValue));
      handle.setAttribute('value', `${currentValue}`);
      if (thumb) {
        thumb.textContent = `${currentValue}`;
      }
      currentValues.push(currentValue);
    });
    this.scale.setAttribute('style', this.getScaleTransformStyle(currentValues));
  };

  private dispatchSliderOptions = (newSliderOptions: IModelOptions) => {
    this.notify('sliderOptionsUpdate', newSliderOptions);
  };

  private setListeners = () => {
    this.bar.addEventListener('mousedown', this.onBarMouseDown);
    this.scale.addEventListener('mousedown', this.onScaleMouseDown);
    this.toggles.forEach((toggle: IToggle) => {
      const { handle } = toggle;
      handle.addEventListener('mousedown', this.onToggleMouseDown);
    });
  };

  private changeCurrentValue = (clickCoord: IClickCoord) => {
    const cleanCoord = this.getCleanCoord(clickCoord);
    const percentOfSlider = this.getPercent(cleanCoord);
    let newCurrentValue = this.getCurrentValueByPercent(percentOfSlider);
    const nearValue = this.getNearValue();
    const isActiveToggleFirst = this.activeToggleIndex === 0;
    let isOutOfRange = false;

    if (isActiveToggleFirst) {
      isOutOfRange = newCurrentValue === nearValue || newCurrentValue > nearValue;
    } else {
      isOutOfRange = newCurrentValue === nearValue || newCurrentValue < nearValue;
    }

    newCurrentValue = isOutOfRange ? nearValue : newCurrentValue;
    const newModelOptions = { ...this.modelOptions };
    if (newModelOptions.currentValue instanceof Array) {
      newModelOptions.currentValue[this.activeToggleIndex] = newCurrentValue;
    }

    this.dispatchSliderOptions(newModelOptions);
  };

  private getCleanCoord = (clickCoord: IClickCoord) => {
    const toggle = this.toggles[this.activeToggleIndex].node;
    const halfHandleWidth = toggle.offsetWidth / 4;
    const leftToggleMargin = this.isVertical ? 5 : 7;
    const sliderOffset = this.isVertical ? this.slider.offsetTop : this.slider.offsetLeft;
    const interfering = sliderOffset - halfHandleWidth + leftToggleMargin;
    const cleanCoord = this.isVertical ? clickCoord.y - interfering : clickCoord.x - interfering;
    return cleanCoord;
  };

  private getPercent = (value: number) => {
    const offset = this.isVertical ? this.slider.offsetHeight : this.slider.offsetWidth;
    let percent = value / offset;
    if (percent > 1) percent = 1;
    if (percent < 0) percent = 0;
    return percent;
  };

  private getPercentByScale = (value: number) => {
    if (this.isVertical) {
      const offset = this.slider.offsetTop;
      const scaleHeight = this.scale.getBoundingClientRect().height;
      const result = value - offset - 14 - 5;
      return result / scaleHeight;
      // const offset = this.slider.offsetTop;
      // const scaleHeight = this.scale.getBoundingClientRect().height;
      // const margin = this.scale.getBoundingClientRect().top;
      // const pureClick = margin - value - 14 - 5;
      // console.log(`pureClick: ${pureClick}`);
      // console.log(pureClick / scaleHeight);
      // const result = pureClick / scaleHeight;
      // return result;
      // const offset = this.scale.getBoundingClientRect().top;
    }

    const { width, height, top, left } = this.scale.getBoundingClientRect();
    const side = this.isVertical ? height : width;
    const margin = this.isVertical ? top : left;
    const offset = this.isVertical ? this.slider.offsetTop : this.slider.offsetLeft;
    return -((margin - offset - value) / side);
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

  private getNearValue = () => {
    if (this.activeToggleIndex) {
      return this.toggles[0].currentValue;
    }

    return this.toggles[1].currentValue;
  };

  private getToggleTransformStyle = (currentValue: number) => {
    const togglePosition = this.getTogglePosition(currentValue);

    if (this.isVertical) {
      return `transform: translate(0px, ${togglePosition}%);`;
    }

    return `transform: translate(${togglePosition}%, 0px);`;
  };

  private getScaleTransformStyle = (currentValues: number[]) => {
    const scalePositions = [
      this.getScalePosition(currentValues[0]),
      this.getScalePosition(currentValues[1]),
    ];

    const translateScale = scalePositions[0] * 100;
    const scalePosition = scalePositions[1] - translateScale * 0.01;

    if (this.isVertical) {
      return `transform: translate(0px, ${translateScale}%) scale(1, ${scalePosition});`;
    }

    return `transform: translate(${translateScale}%, 0px) scale(${scalePosition}, 1);`;
  };

  private getScalePosition = (currentValue: number) => {
    const { range } = this.modelOptions;
    const scalePosition = (+currentValue - range.min) / (range.max - range.min);
    return scalePosition;
  };

  private getTogglePosition = (currentValue: number) => {
    const togglePosition = this.getScalePosition(currentValue) * 1000;
    return togglePosition;
  };

  private getCurrentValueIndex = (target: EventTarget) => {
    const index = this.toggles.findIndex((toggle: IToggle) => toggle.handle === target);
    return index;
  };

  private getToggleIndexByBar = (clickCoord: IClickCoord) => {
    const percentClickOfSlider = this.isVertical
      ? this.getPercent(clickCoord.y)
      : this.getPercent(clickCoord.x);

    return Math.round(percentClickOfSlider);
  };

  getToggleIndexByScale = (clickCoord: IClickCoord) => {
    const percentClickOfScale = this.isVertical
      ? this.getPercentByScale(clickCoord.y)
      : this.getPercentByScale(clickCoord.x);

    return Math.round(percentClickOfScale);
  };

  private onToggleMouseDown = (evt: MouseEvent) => {
    evt.preventDefault();
    const activeToggleIndex = this.getCurrentValueIndex(evt.target);
    if (activeToggleIndex !== -1) {
      this.activeToggleIndex = activeToggleIndex;
      const toggleNode = this.toggles[activeToggleIndex].node;
      toggleNode.classList.add(sliderClassName.toggleActive);
      document.addEventListener('mousemove', this.onToggleMove);
      document.addEventListener('mouseup', this.onToggleUp);
    }
  };

  private onBarMouseDown = (evt: MouseEvent) => {
    evt.preventDefault();
    const activeToggleIndex = this.getToggleIndexByBar({ x: evt.pageX, y: evt.pageY });
    if (activeToggleIndex !== -1) {
      this.activeToggleIndex = activeToggleIndex;
      const toggleNode = this.toggles[activeToggleIndex].node;
      toggleNode.classList.add(sliderClassName.toggleActive);
      this.changeCurrentValue({ x: evt.pageX, y: evt.pageY });
      document.addEventListener('mousemove', this.onToggleMove);
      document.addEventListener('mouseup', this.onToggleUp);
    }
  };

  private onScaleMouseDown = (evt: MouseEvent) => {
    evt.stopPropagation();
    evt.preventDefault();
    const activeToggleIndex = this.getToggleIndexByScale({ x: evt.pageX, y: evt.pageY });
    if (activeToggleIndex !== -1) {
      this.activeToggleIndex = activeToggleIndex;
      const toggleNode = this.toggles[activeToggleIndex].node;
      toggleNode.classList.add(sliderClassName.toggleActive);
      this.changeCurrentValue({ x: evt.pageX, y: evt.pageY });
      document.addEventListener('mousemove', this.onToggleMove);
      document.addEventListener('mouseup', this.onToggleUp);
    }
  };

  private onToggleMove = (evt: MouseEvent) => {
    this.changeCurrentValue({ x: evt.pageX, y: evt.pageY });
  };

  private onToggleUp = (evt: MouseEvent) => {
    evt.preventDefault();
    const toggleNode = this.toggles[this.activeToggleIndex].node;
    toggleNode.classList.remove(sliderClassName.toggleActive);
    this.activeToggleIndex = -1;
    document.removeEventListener('mousemove', this.onToggleMove);
    document.removeEventListener('mouseup', this.onToggleUp);
  };
}

export default DoubleToggle;
