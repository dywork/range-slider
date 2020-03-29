import { Presenter } from './Presenter/Presenter';
import Observer from './Observer/Observer';

class Slider extends Observer {
  private presenter: Presenter;

  constructor() {
    super();
    this.presenter = new Presenter({ currentValue: 0, minValue: 0, maxValue: 100 });
  }

  init = () => {
    this.presenter.init();
    this.addObserver(this.presenter.notifyObservers);
    this.presenter.addObserver((data: Object) => this.notifyObservers(data));
  };
}

const slider = new Slider();
slider.init();
