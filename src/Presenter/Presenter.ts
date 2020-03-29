import { Model, IModel } from '../Model/Model';
import { View, IView } from '../View/View';
import ISliderOptions from '../interfaces/ISliderOptions';

interface IPresenter {
  init(): void;
}

class Presenter implements IPresenter {
  private model: IModel;

  private view: IView;

  constructor(sliderOptions: ISliderOptions) {
    this.model = new Model(sliderOptions);
    this.view = new View(this.model.getOptions());
  }

  init() {
    this.view.render();
  }
}

export { Presenter, IPresenter };
