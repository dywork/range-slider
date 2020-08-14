import Model from '../Model/Model';
import View from '../View/View';
import Observer from '../Observer/Observer';
import ISliderOptions from '../ISliderOptions';

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
    this.subscribeModules();
    this.view.render();
  }

  private subscribeModules = () => {
    this.view.subscribe('sliderOptionsUpdate', this.dispatchSliderOptions);
    this.model.subscribe('sliderOptionsUpdate', this.onSliderOptionsUpdate);
  };

  private dispatchSliderOptions = (newSliderOptions: ISliderOptions) => {
    this.model.updateSliderOptions(newSliderOptions);
  };

  private onSliderOptionsUpdate = (sliderOptions: ISliderOptions) => {
    this.view.updateSliderOptions(sliderOptions);
  };
}

export default Presenter;
