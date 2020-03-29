import { Model, IModel } from './Model/Model';
import { View, IView } from './View/View';
import { Presenter, IPresenter } from './Presenter/Presenter';
import Observer from './Observer/Observer';

class Slider extends Observer {
  private model: IModel;

  private view: IView;

  private presenter: IPresenter;

  constructor() {
    super();
    this.model = new Model({ currentValue: 0, minValue: 0, maxValue: 100 });
    this.view = new View(this.model.getOptions());
    this.presenter = new Presenter(this.model, this.view);
  }

  init = () => {
    this.presenter.init();
  };
}

const slider = new Slider();
slider.init();
