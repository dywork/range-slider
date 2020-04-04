import Presenter from './Presenter/Presenter';
import { IViewOptions } from './View/View';
import './style/style.scss';

interface ISliderOptions {
  domParent: HTMLElement;
  currentValue: number;
  range: { min: number; max: number };
  isThumb: boolean;
}

class Slider {
  private presenter: Presenter;

  constructor(sliderOptions: ISliderOptions) {
    const viewOptions: IViewOptions = this.getViewOptions(sliderOptions);
    const modelOptions = this.getModelOptions(sliderOptions);
    this.presenter = new Presenter(viewOptions, modelOptions);
  }

  init = () => {
    this.presenter.init();
  };

  private getViewOptions = (sliderOptions: ISliderOptions) => {
    const { domParent, isThumb } = sliderOptions;
    const viewOptions: IViewOptions = { domParent, isThumb };
    return viewOptions;
  };

  private getModelOptions = (sliderOptions: ISliderOptions) => {
    const { currentValue, range } = sliderOptions;
    const modelOptions = { currentValue, range };
    return modelOptions;
  };
}

export { Slider, ISliderOptions };
