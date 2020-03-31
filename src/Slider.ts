import Presenter from './Presenter/Presenter';
import ISliderOptions from './interfaces/ISliderOptions';
import './style/style.scss';

class Slider {
  private presenter: Presenter;

  constructor(sliderOptions: ISliderOptions) {
    this.presenter = new Presenter(sliderOptions);
  }

  init = () => {
    this.presenter.init();
  };
}

export default Slider;
