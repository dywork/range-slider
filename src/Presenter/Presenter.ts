import { Model } from '../Model/Model';
import View from '../View/View';

import { IOptions, IRange } from '../types/options';

class Presenter {
  private start: number;

  private range: IRange;

  constructor(options: IOptions) {
    this.start = options.start;
    this.range = options.range;
  }

  init = () => {
    const model = new Model(this.start, this.range);
    const view = new View(model.getStart(), model.getRange());
    view.render();
  };
}

export default Presenter;
