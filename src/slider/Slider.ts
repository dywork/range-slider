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

  onChangeOptions = (value: number) => {
    console.log(value);
  };

  getSliderOptions = () => this.sliderOptions;
}

export { Slider, ISliderOptions };
