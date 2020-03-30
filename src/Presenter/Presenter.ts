import Model from '../Model/Model';
import View from '../View/View';
import ISliderOptions from '../interfaces/ISliderOptions';
import Observer from '../Observer/Observer';

interface IPresenter {
  init(): void;
}

class Presenter extends Observer implements IPresenter {
  private model: Model;

  private view: View;

  constructor(sliderOptions: ISliderOptions) {
    super();
    this.model = new Model(sliderOptions);
    this.view = new View(this.model.getOptions());
  }

  init() {
    this.view.subscribe('sliderOptionsUpdate', this.onChangeSliderOptions);
    this.model.subscribe('sliderOptionsUpdate', this.onSliderOptionsUpdate);
    this.view.render();
  }

  private onChangeSliderOptions = (newSliderOptions: ISliderOptions) => {
    this.model.updateSliderOptions(newSliderOptions);
  };

  private onSliderOptionsUpdate = (sliderOptions: ISliderOptions) => {
    this.view.redrawValue(sliderOptions);
  };
}

export { Presenter, IPresenter };
