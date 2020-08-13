import Presenter from './Presenter/Presenter';
import IViewOptions from './View/IViewOptions';

interface ISliderOptions {
  domParent: HTMLElement;
  currentValue: number | number[];
  range: { min: number; max: number };
  isRuler: boolean;
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

  onChangeOptions = (value: number) => {
    console.log(value);
  };

  private getViewOptions = (sliderOptions: ISliderOptions) => {
    const {
      domParent,
      isRuler,
      isThumb,
      decimal,
      orientation,
    } = sliderOptions;

    const viewOptions: IViewOptions = {
      domParent,
      isThumb,
      isRuler,
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
