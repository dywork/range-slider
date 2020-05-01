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
    const node = this.domParent.querySelectorAll(`.${sliderClassName.toggle}`)[
      index
    ] as HTMLDivElement;
    const handle = this.domParent.querySelectorAll(`.${sliderClassName.handle}`)[
      index
    ] as HTMLDivElement;
    const thumb = isThumb
      ? (this.domParent.querySelectorAll(`.${sliderClassName.thumb}`)[index] as HTMLDivElement)
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
    // this.bar.addEventListener('mousedown', this.onBarMouseDown);
    this.toggles.forEach((toggle: IToggle) => {
      const { handle } = toggle;
      handle.addEventListener('mousedown', this.onToggleMouseDown);
    });
  };

  private changeCurrentValue = (clickCoord: IClickCoord) => {
    const cleanCoord = this.getCleanCoord(clickCoord);
    const percentOfSlider = this.getPercent(cleanCoord);
    const newCurrentValue = this.getCurrentValueByPercent(percentOfSlider);
    const newModelOptions = { ...this.modelOptions };
    if (newModelOptions.currentValue instanceof Array) {
      newModelOptions.currentValue[this.activeToggleIndex] = newCurrentValue;
    }

    this.dispatchSliderOptions(newModelOptions);
  };

  private getCleanCoord = (clickCoord: IClickCoord) => {
    const toggle = this.toggles[this.activeToggleIndex].node;
    const halfHandleWidth = toggle.offsetWidth / 2;
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

  private onToggleMouseDown = (evt: MouseEvent) => {
    evt.preventDefault();
    const activeToggleIndex = this.getCurrentValueIndex(evt.target);
    if (activeToggleIndex !== -1) {
      this.activeToggleIndex = activeToggleIndex;
      document.addEventListener('mousemove', this.onToggleMove);
      document.addEventListener('mouseup', this.onToggleUp);
    }
  };

  private onToggleMove = (evt: MouseEvent) => {
    this.changeCurrentValue({ x: evt.pageX, y: evt.pageY });
  };

  private onToggleUp = (evt: MouseEvent) => {
    evt.preventDefault();
    this.activeToggleIndex = -1;
    document.removeEventListener('mousemove', this.onToggleMove);
    document.removeEventListener('mouseup', this.onToggleUp);
  };

  // private onToggleMouseDown = (evt: MouseEvent) => {
  //   evt.preventDefault();
  //   this.toggleIndex = this.getCurrentValueIndex(evt.target);

  //   const onMouseMove = (moveEvt: MouseEvent) => {
  //     moveEvt.preventDefault();
  //     console.log(toggleIndex);
  //   };

  //   const onMouseUp = (upEvt: MouseEvent) => {
  //     upEvt.preventDefault();
  //     this.toggles[toggleIndex].isHandleMove = false;
  //     document.removeEventListener('mousemove', onMouseMove);
  //     document.removeEventListener('mouseup', onMouseUp);
  //   };

  //   document.addEventListener('mousemove', onMouseMove);
  //   document.addEventListener('mouseup', onMouseUp);
  // };

  // private onToggleMouseDown = (evt: MouseEvent) => {
  //   evt.preventDefault();

  //   const onMouseMove = (moveEvt: MouseEvent) => {
  //     moveEvt.preventDefault();
  //     const cleanCoordX = this.getCleanCoordX(moveEvt.pageX);
  //     this.percentOfSliderWidth = this.getPercentOfSliderWidth(cleanCoordX);
  //     const newCurrentValue = this.getCurrentValueByPercent(this.percentOfSliderWidth);
  //     const newViewOptions = this.viewOptions;
  //     newViewOptions.currentValue = newCurrentValue;
  //     this.dispatchSliderOptions(newViewOptions);
  //   };

  //   const onMouseUp = (upEvt: MouseEvent) => {
  //     upEvt.preventDefault();

  //     document.removeEventListener('mousemove', onMouseMove);
  //     document.removeEventListener('mouseup', onMouseUp);
  //   };

  //   document.addEventListener('mousemove', onMouseMove);
  //   document.addEventListener('mouseup', onMouseUp);
  // };
}

export default DoubleToggle;
