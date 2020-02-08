import { Model, IRange } from '../Model/Model';
import View from '../View/View';

interface IOptions {
  start: number;
  range: IRange;
}

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

export { Presenter, IOptions };
