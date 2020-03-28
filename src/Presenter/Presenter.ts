import { IModel } from '../Model/Model';
import { IView } from '../View/View';

class Presenter {
  private model: IModel;

  private view: IView;

  constructor(Model: IModel, View: IView) {
    this.model = Model;
    this.view = View;
  }
}

export default Presenter;
