import Observer from './observer/Observer';
import Presenter from './presenter/Presenter';
import ISliderOptions from './interfaces/ISliderOptions';
import IModelOptions from './interfaces/IModelOptions';

class Slider extends Observer {
  private presenter: Presenter;

  constructor(sliderOptions: ISliderOptions) {
    super();
    this.presenter = new Presenter(sliderOptions);
  }

  init = () => {
    this.presenter.init();
    this.presenter.subscribe('modelOptionsUpdate', this._alertSubs);
  };

  updateOptions = (modelOptions: IModelOptions) => {
    this.presenter.updateOptions(modelOptions);
  };

  getModelOptions = () => this.presenter.getModelOptions();

  getDomParent = () => this.presenter.getDomParent();

  private _alertSubs = () => {
    this.notify('modelOptionsUpdate', this.getModelOptions());
  };
}

export default Slider;
