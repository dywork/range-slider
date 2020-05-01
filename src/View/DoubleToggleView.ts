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

class DoubleToggle {
  private viewOptions: IViewOptions;

  private modelOptions: IModelOptions;

  private domParent: HTMLElement;

  private isVertical: boolean;

  private slider: HTMLDivElement;

  private bar: HTMLDivElement;

  private scale: HTMLDivElement;

  private toggles: Array<IToggle>;

  constructor(viewOptions: IViewOptions, modelOptions: IModelOptions) {
    this.viewOptions = viewOptions;
    this.modelOptions = modelOptions;
    this.domParent = this.viewOptions.domParent;
    this.isVertical = this.viewOptions.orientation === 'vertical';
  }

  render = () => {
    this.mountSlider();
    this.saveDomElement();
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
    let currenValues: number[];
    if (Array.isArray(this.modelOptions.currentValue)) {
      currenValues = this.modelOptions.currentValue;
    }
    this.slider = this.domParent.querySelector(`.${sliderClassName.slider}`);
    this.bar = this.domParent.querySelector(`.${sliderClassName.bar}`);
    this.scale = this.domParent.querySelector(`.${sliderClassName.scale}`);
    this.toggles = currenValues.map(this.getToggleObj);
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

  private getToggleTransformStyle = (currentValue: number) => {
    const togglePosition = this.getTogglePosition(currentValue);

    if (this.isVertical) {
      return `transform: translate(0px, ${togglePosition}%);`;
    }

    return `transform: translate(${togglePosition}%, 0px);`;
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
}

export default DoubleToggle;
