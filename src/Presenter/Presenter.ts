import { IModel } from '../Model/Model';
import { IView } from '../View/View';

interface IPresenter {
  init(): void;
}

class Presenter implements IPresenter {
  private model: IModel;

  private view: IView;

  constructor(Model: IModel, View: IView) {
    this.model = Model;
    this.view = View;
  }

  init() {
    this.view.render();
  }
}

export { Presenter, IPresenter };
