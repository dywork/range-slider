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

  private subscribeModules = () => {
    this.view.subscribe('sliderOptionsUpdate', this.dispatchSliderOptions);
    this.model.subscribe('sliderOptionsUpdate', this.onSliderOptionsUpdate);
  };

  private onSliderOptionsUpdate = (sliderOptions: ISliderOptions) => {
    this.view.updateSliderOptions(sliderOptions);
    this.notify('sliderOptionsUpdate', sliderOptions);
  };
}

export default Presenter;
