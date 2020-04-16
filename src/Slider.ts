import Presenter from './Presenter/Presenter';
import { IViewOptions } from './View/View';
import './style/style.scss';

interface ISliderOptions {
  domParent: HTMLElement;
  currentValue: number;
  range: { min: number; max: number };
  isThumb: boolean;
  step: number;
  decimal: number;
  orientation: string;
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
    const {
      domParent,
      isThumb,
      decimal,
      orientation,
    } = sliderOptions;

    const viewOptions: IViewOptions = {
      domParent,
      isThumb,
      decimal,
      orientation,
    };

    return viewOptions;
  };

  private getModelOptions = (sliderOptions: ISliderOptions) => {
    const { currentValue, range, step } = sliderOptions;
    const modelOptions = { currentValue, range, step };
    return modelOptions;
  };
}

export { Slider, ISliderOptions };
