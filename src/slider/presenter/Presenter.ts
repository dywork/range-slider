import has from 'has';
import Model from '../model/Model';
import View from '../view/View';
import Observer from '../observer/Observer';
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
    this.model.updateOptions(this.getSplitModelOptions(modelOptions));
  };

  getModelOptions = () => this.model.getOptions();

  getDomParent = () => this.domParent;

  getRulerValues = () => this.view.getRulerValues();

  private getSplitModelOptions = (
    sliderOptions: ISliderOptions | IModelOptions,
  ): IModelOptions => {
    const {
      currentValues,
      range,
      withRuler,
      withThumb,
      step,
      orientation,
      maxDecimalPlace,
      rulerStep,
    } = sliderOptions;

    return {
      currentValues,
      range,
      withRuler,
      withThumb,
      step,
      orientation,
      maxDecimalPlace,
      rulerStep,
    };
  };

  private subscribeModules = () => {
    this.model.subscribe('modelOptionsUpdate', this.onModelOptionsUpdate);
    this.view.subscribe('modelOptionsUpdate', this.onViewChangedModelOptions);
  };

  private onModelOptionsUpdate = (modelOptions: IModelOptions) => {
    this.view.updateModelOptions(modelOptions);
    this.notify('modelOptionsUpdate', this.model.getOptions());
  };

  private onViewChangedModelOptions = (modelOptions: IModelOptions) => {
    this.model.updateOptions(modelOptions);
    this.notify('modelOptionsUpdate', this.model.getOptions());
  };

  private checkOnChangeRange = (modelOptions: IModelOptions) => {
    const { currentValues: oldCurrentValues } = this.model.getOptions();
    const { currentValues: newCurrentValues } = modelOptions;
    const isOldRange = has(oldCurrentValues, 'max');
    const isNewRange = has(newCurrentValues, 'max');
    const isRangeChange = (!isOldRange && isNewRange) || (isOldRange && !isNewRange);

    if (isRangeChange) {
      this.view.destroyDom();
      this.view = new View(modelOptions, this.domParent);
      this.view.subscribe('modelOptionsUpdate', this.onViewChangedModelOptions);
      this.view.render();
    }
  };

  private checkOnChangeOrientation = (modelOptions: IModelOptions) => {
    const { orientation: oldOrientation } = this.model.getOptions();
    const { orientation: newOrientation } = modelOptions;
    const isOrientationChange = oldOrientation !== newOrientation;

    if (isOrientationChange) {
      this.view.destroyDom();
      this.view = new View(modelOptions, this.domParent);
      this.view.subscribe('modelOptionsUpdate', this.onViewChangedModelOptions);
      this.view.render();
    }
  };
}

export default Presenter;
