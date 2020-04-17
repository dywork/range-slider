import IViewOptions from './IViewOptions';
import { IModelOptions } from '../Model/Model';
import sliderClassName from './sliderClassName';

const sliderTemplate = require('./template/sliderTemplate.hbs');

interface IToggle {
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
}

export default DoubleToggle;
