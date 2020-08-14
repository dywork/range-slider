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
  private sliderOptions: ISliderOptions;

  private presenter: Presenter;

  constructor(sliderOptions: ISliderOptions) {
    this.sliderOptions = sliderOptions;
    const viewOptions: IViewOptions = this.getViewOptions();
    const modelOptions = this.getModelOptions();
    this.presenter = new Presenter(viewOptions, modelOptions);
  }

  init = () => {
    this.presenter.init();
  };

  onChangeOptions = (value: number) => {
    console.log(value);
  };

  getSliderOptions = () => this.sliderOptions;

  private getViewOptions = () => {
    const {
      domParent,
      isRuler,
      isThumb,
      decimal,
      orientation,
    } = this.getSliderOptions();

    const viewOptions: IViewOptions = {
      domParent,
      isThumb,
      isRuler,
      decimal,
      orientation,
    };

    return viewOptions;
  };

  private getModelOptions = () => {
    const { currentValue, range, step } = this.getSliderOptions();
    const modelOptions = { currentValue, range, step };
    return modelOptions;
  };
}

export { Slider, ISliderOptions };
