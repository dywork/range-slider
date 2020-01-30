import { Model } from '../Model/Model';
import View from '../View/View';

class Presenter {
  init = () => {
    const start = 0;
    const range = {
      min: 0,
      max: 100,
    };
    const model = new Model(start, range);
    const view = new View(model.getStart(), model.getRange());
    view.render();
  };
}

export default Presenter;
