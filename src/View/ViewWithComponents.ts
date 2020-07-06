import Observer from '../Observer/Observer';
import IViewOptions from './IViewOptions';
import { IModelOptions } from '../Model/Model';
import Scale from './components/Scale/Scale';
import Toggle from './components/Toggle/Toggle';
import Thumb from './components/Thumb/Thumb';
import sliderClassName from './sliderClassName';

interface IToggle {
  main: Toggle;
  thumb: Thumb | null;
}

class View extends Observer {
  private viewOptions: IViewOptions;

  private modelOptions: IModelOptions;

  private domParent: HTMLElement;

  private scale: Scale;

  private toggles: IToggle[];

  private isVertical: boolean;

  constructor(viewOptions: IViewOptions, modelOptions: IModelOptions) {
    super();
    this.viewOptions = viewOptions;
    this.modelOptions = modelOptions;
    this.domParent = this.viewOptions.domParent;
    this.isVertical = this.viewOptions.orientation === 'vertical';
    this.scale = new Scale(this.modelOptions, this.isVertical);
    this.toggles = this.getToggles();
  }

  updateSliderOptions = (newSliderOptions: IModelOptions) => {
    this.modelOptions = newSliderOptions;
    // this.redrawValue();
  };

  render = () => {
    this.mountSlider();
    console.log(this.toggles);
  };

  private getToggles = () => {
    const { currentValue } = this.modelOptions;
    const { isThumb } = this.viewOptions;

    if (currentValue instanceof Array) {
      return currentValue.map((value: number) => {
        const scalePosition = this.scale.getPosition(value);
        const toggle = {
          main: new Toggle(scalePosition, this.isVertical),
          thumb: isThumb ? new Thumb(value) : null,
        };

        return toggle;
      });
    }

    const scalePosition = this.scale.getPosition(currentValue);
    const toggle = {
      main: new Toggle(scalePosition, this.isVertical),
      thumb: isThumb ? new Thumb(currentValue) : null,
    };

    return [toggle];
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
    // const toggle = new Toggle(scale.getPosition(), this.isVertical).getHtml();
    const thumb = new Thumb(this.modelOptions.currentValue).getHtml();

    // toggle.appendChild(thumb);
    sliderContainer.appendChild(scale.getHtml());
    // sliderContainer.appendChild(toggle);

    return sliderContainer;
  };
}

export default View;
