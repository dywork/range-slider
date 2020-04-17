import { Model, IModelOptions } from '../Model/Model';
import View from '../View/View';
import IViewOptions from '../View/IViewOptions';
import Observer from '../Observer/Observer';

interface IPresenter {
  init(): void;
}

class Presenter extends Observer implements IPresenter {
  private model: Model;

  private view: View;

  constructor(viewOptions: IViewOptions, modelOptions: IModelOptions) {
    super();
    this.model = new Model(modelOptions);
    this.view = new View(viewOptions, this.model.getOptions());
  }

  init() {
    this.subscribeModules();
    this.view.render();
  }

  private subscribeModules = () => {
    this.view.subscribe('sliderOptionsUpdate', this.dispatchSliderOptions);
    this.model.subscribe('sliderOptionsUpdate', this.onSliderOptionsUpdate);
  };

  private dispatchSliderOptions = (newSliderOptions: IModelOptions) => {
    this.model.updateSliderOptions(newSliderOptions);
  };

  private onSliderOptionsUpdate = (sliderOptions: IModelOptions) => {
    this.view.updateSliderOptions(sliderOptions);
  };
}

export default Presenter;
