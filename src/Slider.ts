import Presenter from './Presenter/Presenter';
import ISliderOptions from './interfaces/ISliderOptions';
import './style/style.scss';

class Slider {
  private presenter: Presenter;

  constructor(domParent: HTMLElement, sliderOptions: ISliderOptions) {
    this.presenter = new Presenter(domParent, sliderOptions);
  }

  init = () => {
    this.presenter.init();
  };
}

export default Slider;
