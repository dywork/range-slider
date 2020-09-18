import Observer from './Observer/Observer';
import Presenter from './Presenter/Presenter';
import ISliderOptions from './ISliderOptions';

class Slider extends Observer {
  private sliderOptions: ISliderOptions;

  private presenter: Presenter;

  constructor(sliderOptions: ISliderOptions) {
    super();
    this.sliderOptions = sliderOptions;
    this.presenter = new Presenter(sliderOptions);
  }

  init = () => {
    this.presenter.init();
    this.presenter.subscribe('sliderOptionsUpdate', this.alertSubs);
  };

  updateSliderOptions = (sliderOptions: ISliderOptions) => {
    this.sliderOptions = sliderOptions;
    this.presenter.dispatchSliderOptions(this.sliderOptions);
  };

  getSliderOptions = () => this.sliderOptions;

  private alertSubs = (newSliderOptions: ISliderOptions) => {
    this.sliderOptions = newSliderOptions;
    this.notify('sliderOptionsUpdate', this.getSliderOptions());
  };
}

export { Slider, ISliderOptions };
