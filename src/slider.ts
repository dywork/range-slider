import { Presenter, IPresenter } from './Presenter/Presenter';
import Observer from './Observer/Observer';

class Slider extends Observer {
  private presenter: IPresenter;

  constructor() {
    super();
    this.presenter = new Presenter({ currentValue: 0, minValue: 0, maxValue: 100 });
  }

  init = () => {
    this.presenter.init();
  };
}

const slider = new Slider();
slider.init();
