import Presenter from './Presenter/Presenter';
import ISliderOptions from './ISliderOptions';

class Slider {
  private sliderOptions: ISliderOptions;

  private presenter: Presenter;

  constructor(sliderOptions: ISliderOptions) {
    this.sliderOptions = sliderOptions;
    this.presenter = new Presenter(sliderOptions);
  }

  init = () => {
    this.presenter.init();
  };

  onChangeCurrentValue = (value: any) => {
    // this.sliderOptions.currentValue = value;
    this.sliderOptions = value;
    this.presenter.dispatchSliderOptions(this.sliderOptions);
  };

  getSliderOptions = () => this.sliderOptions;
}

export { Slider, ISliderOptions };
