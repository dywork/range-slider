import Model from '../Model/Model';
import View from '../View/View';
import Observer from '../Observer/Observer';
import ISliderOptions from '../ISliderOptions';

class Presenter extends Observer {
  private model: Model;

  private view: View;

  constructor(sliderOptions: ISliderOptions) {
    super();
    this.model = new Model(sliderOptions);
    this.view = new View(this.model.getOptions());
  }

  init() {
    this._subscribeModules();
    this.view.render();
  }

  dispatchSliderOptions = (newSliderOptions: ISliderOptions) => {
    const { currentValue: oldCurrentValue } = this.model.getOptions();
    const { currentValue: newCurrentValue } = newSliderOptions;
    const isOldRange = oldCurrentValue instanceof Array;
    const isNewRange = newCurrentValue instanceof Array;
    const isRangeChange = (!isOldRange && isNewRange) || (isOldRange && !isNewRange);

    if (isRangeChange) {
      this.view.destroyDom();
      this.view = new View(newSliderOptions);
      this.view.subscribe('sliderOptionsUpdate', this.dispatchSliderOptions);
      this.view.render();
    }

    const { orientation: oldOrientation } = this.model.getOptions();
    const { orientation: newOrientation } = newSliderOptions;
    const isOrientationChange = oldOrientation !== newOrientation;

    if (isOrientationChange) {
      this.view.destroyDom();
      this.view = new View(newSliderOptions);
      this.view.subscribe('sliderOptionsUpdate', this.dispatchSliderOptions);
      this.view.render();
    }

    this.model.updateSliderOptions(newSliderOptions);
    this.notify('sliderOptionsUpdate', this.model.getOptions());
  };

  private _subscribeModules = () => {
    this.view.subscribe('sliderOptionsUpdate', this.dispatchSliderOptions);
    this.model.subscribe('sliderOptionsUpdate', this._onSliderOptionsUpdate);
  };

  private _onSliderOptionsUpdate = (sliderOptions: ISliderOptions) => {
    this.view.updateSliderOptions(sliderOptions);
    this.notify('sliderOptionsUpdate', sliderOptions);
  };
}

export default Presenter;
