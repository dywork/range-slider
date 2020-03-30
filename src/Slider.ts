import { Presenter } from './Presenter/Presenter';
import Observer from './Observer/Observer';
import ISliderOptions from './interfaces/ISliderOptions';

class Slider extends Observer {
  private presenter: Presenter;

  constructor(sliderOptions: ISliderOptions) {
    super();
    this.presenter = new Presenter(sliderOptions);
  }

  init = () => {
    this.presenter.init();
  };
}

export default Slider;
