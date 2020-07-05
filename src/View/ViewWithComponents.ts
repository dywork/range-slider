import Observer from '../Observer/Observer';
import IViewOptions from './IViewOptions';
import { IModelOptions } from '../Model/Model';
import Scale from './components/Scale/Scale';
import Toggle from './components/Toggle/Toggle';
import Thumb from './components/Thumb/Thumb';
import sliderClassName from './sliderClassName';

interface IView {
  render(): void;
}

class View extends Observer implements IView {
  private viewOptions: IViewOptions;

  private modelOptions: IModelOptions;

  private domParent: HTMLElement;

  private isVertical: boolean;

  constructor(viewOptions: IViewOptions, modelOptions: IModelOptions) {
    super();
    this.viewOptions = viewOptions;
    this.modelOptions = modelOptions;
    this.domParent = this.viewOptions.domParent;
    this.isVertical = this.viewOptions.orientation === 'vertical';
  }

  updateSliderOptions = (newSliderOptions: IModelOptions) => {
    this.modelOptions = newSliderOptions;
    // this.redrawValue();
  };

  render = () => {
    this.mountSlider();
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

    const scale = new Scale(this.modelOptions, this.isVertical);
    const toggle = new Toggle(scale.getPosition(), this.isVertical).getHtml();
    const thumb = new Thumb(this.modelOptions.currentValue).getHtml();

    toggle.appendChild(thumb);
    sliderContainer.appendChild(scale.getHtml());
    sliderContainer.appendChild(toggle);

    return sliderContainer;
  };
}

export default View;
