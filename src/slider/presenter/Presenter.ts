import has from 'has';
import Model from '../model/Model';
import View from '../view/View';
import Observer from '../observer/Observer';
import ObserverEvents from '../observer/ObserverEvents';
import IModelOptions from '../interfaces/IModelOptions';
import ISliderOptions from '../interfaces/ISliderOptions';

class Presenter extends Observer {
  private model: Model;

  private view: View;

  private domParent: HTMLElement;

  constructor(sliderOptions: ISliderOptions) {
    super();
    this.domParent = sliderOptions.domParent;
    this.model = new Model(this.getSplitModelOptions(sliderOptions));
    this.view = new View(this.model.getOptions(), sliderOptions.domParent);
  }

  init = () => {
    this.subscribeModules();
    this.view.render();
  };

  updateOptions = (modelOptions: IModelOptions) => {
    this.checkOnChangeRange(modelOptions);
    this.checkOnChangeOrientation(modelOptions);
    this.checkOnChangeThumbDisplay(modelOptions);
    this.model.updateOptions(this.getSplitModelOptions(modelOptions));
  };

  getModelOptions = () => this.model.getOptions();

  getDomParent = () => this.domParent;

  getRulerValues = () => this.view.getRulerValues();

  private getSplitModelOptions = (sliderOptions: ISliderOptions | IModelOptions): IModelOptions => {
    const {
      currentValues, range, withRuler, withThumb, step, orientation,
    } = sliderOptions;

    return {
      currentValues,
      range,
      withRuler,
      withThumb,
      step,
      orientation,
    };
  };

  private subscribeModules = () => {
    this.model.subscribe(ObserverEvents.modelOptionsUpdate, this.onModelOptionsUpdate);
    this.view.subscribe(ObserverEvents.modelOptionsUpdate, this.onViewChangedModelOptions);
  };

  private onModelOptionsUpdate = (modelOptions: IModelOptions) => {
    this.view.updateModelOptions(modelOptions);
    this.notify(ObserverEvents.modelOptionsUpdate, this.model.getOptions());
  };

  private onViewChangedModelOptions = (modelOptions: IModelOptions) => {
    this.model.updateOptions(modelOptions);
    this.notify(ObserverEvents.modelOptionsUpdate, this.model.getOptions());
  };

  private checkOnChangeRange = (modelOptions: IModelOptions) => {
    const { currentValues: oldCurrentValues } = this.model.getOptions();
    const { currentValues: newCurrentValues } = modelOptions;
    const isOldRange = has(oldCurrentValues, 'max');
    const isNewRange = has(newCurrentValues, 'max');
    const isRangeChange = (!isOldRange && isNewRange) || (isOldRange && !isNewRange);

    if (isRangeChange) {
      this.renderNewView(modelOptions);
    }
  };

  private checkOnChangeOrientation = (modelOptions: IModelOptions) => {
    const { orientation: oldOrientation } = this.model.getOptions();
    const { orientation: newOrientation } = modelOptions;
    const isOrientationChange = oldOrientation !== newOrientation;

    if (isOrientationChange) {
      this.renderNewView(modelOptions);
    }
  };

  private checkOnChangeThumbDisplay = (modelOptions: IModelOptions) => {
    const { withThumb: oldWithThumb } = this.model.getOptions();
    const { withThumb: newWithThumb } = modelOptions;
    const isWithThumbChange = oldWithThumb !== newWithThumb;

    if (isWithThumbChange) {
      this.renderNewView(modelOptions);
    }
  };

  private renderNewView = (modelOptions: IModelOptions) => {
    this.view.destroyDom();
    this.view = new View(modelOptions, this.domParent);
    this.view.subscribe(ObserverEvents.modelOptionsUpdate, this.onViewChangedModelOptions);
    this.view.render();
  };
}

export default Presenter;
