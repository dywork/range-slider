import { IModel } from '../Model/Model';
import { IView } from '../View/View';

class Presenter {
  private model: IModel;

  private view: IView;

  constructor(model: IModel, view: IView) {
    this.model = model;
    this.view = view;
  }

  init = () => {
    this.view.render();
  };
}

export default Presenter;
