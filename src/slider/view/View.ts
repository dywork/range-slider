import has from 'has';
import Ruler from './components/ruler/Ruler';
import Scale from './components/scale/Scale';
import Thumb from './components/thumb/Thumb';
import Toggle from './components/toggle/Toggle';
import sliderClassNames from './utils/sliderClassNames';
import Observer from '../observer/Observer';
import IModelOptions from '../interfaces/IModelOptions';
import IRulerProps from '../interfaces/view/components/ruler/IRulerProps';
import IScaleProps from '../interfaces/view/components/scale/IScaleProps';
import IToggle from '../interfaces/view/components/toggle/IToggle';
import IToggleProps from '../interfaces/view/components/toggle/IToggleProps';

interface IClickCoordinate {
  x: number;
  y: number;
}

class View extends Observer {
  private modelOptions: IModelOptions;

  private domParent: HTMLElement;

  private slider: HTMLElement;

  private isVertical: boolean;

  private isRange: boolean;

  private ruler: Ruler;

  private scale: Scale;

  private toggles: IToggle[];

  private activeToggle: Toggle;

  private activeToggleIndex: number;

  constructor(modelOptions: IModelOptions, domParent: HTMLElement) {
    super();
    this.modelOptions = modelOptions;
    this.domParent = domParent;
    const { currentValues, orientation } = this.modelOptions;
    this.isVertical = orientation === 'vertical';
    this.isRange = has(currentValues, 'max');
    this.initViewComponents();
  }

  render = () => {
    this.mountSlider();
    this.saveDom();
    this.setListeners();
  };

  destroyDom = () => {
    this.domParent.removeChild(this.slider);
  };

  updateModelOptions = (modelOptions: IModelOptions) => {
    this.modelOptions = modelOptions;
    this.redrawValue();
  };

  getRulerValues = () => this.ruler.getRulerValues();

  private initViewComponents = () => {
    const { withRuler } = this.modelOptions;
    this.ruler = withRuler ? this.getRuler() : null;
    this.scale = this.getScale();
    this.toggles = this.getToggles();
  };

  private getRuler = () => {
    const ruler = new Ruler(this.getRulerProps());
    ruler.subscribe('onRulerHide', this.onRulerHide);
    return ruler;
  };

  private getRulerProps = (): IRulerProps => {
    const {
      range, step, withRuler, maxDecimalPlace,
    } = this.modelOptions;

    if (!step) {
      return {
        range,
        step: 1,
        withRuler,
        isVertical: this.isVertical,
        maxDecimalPlace,
      };
    }

    return {
      range,
      step,
      withRuler,
      isVertical: this.isVertical,
      maxDecimalPlace,
    };
  };

  private onRulerHide = () => {
    if (this.ruler) {
      this.ruler.destroyDom();
      this.ruler = null;
    }
  };

  private getScale = () => new Scale(this.getScaleProps());

  private getScaleProps = (): IScaleProps => {
    const { currentValues, range } = this.modelOptions;
    return { currentValues, range, isVertical: this.isVertical };
  };

  private getToggles = () => {
    const { currentValues, withThumb } = this.modelOptions;

    return Object.entries(currentValues).map(([, value]) => {
      const scalePosition = this.scale.getPosition(value);
      const toggleProps: IToggleProps = { scalePosition, isVertical: this.isVertical };
      const toggle = {
        main: new Toggle(toggleProps),
        thumb: withThumb ? new Thumb(this.getThumbProps(value)) : null,
      };

      if (toggle.thumb) {
        toggle.thumb.subscribe('onThumbHide', this.onThumbHide);
      }

      return toggle;
    });
  };

  private getThumbProps = (value: number) => {
    const { withThumb } = this.modelOptions;
    return { withThumb, value };
  };

  private onThumbHide = () => {
    this.toggles.forEach((toggle: IToggle) => {
      if (toggle.thumb) {
        toggle.thumb.destroyDom();
        // eslint-disable-next-line no-param-reassign
        toggle.thumb = null;
      }
    });
  };

  private mountSlider = () => {
    this.domParent.appendChild(this.createSliderContainer());
  };

  private createSliderContainer = () => {
    const sliderDom = document.createElement('div');
    sliderDom.classList.add(sliderClassNames.slider);
    const sliderContainer = document.createElement('div');
    sliderContainer.classList.add(sliderClassNames.wrap);

    if (this.isVertical) {
      sliderContainer.classList.add(sliderClassNames.sliderVertical);
    }

    sliderContainer.appendChild(this.scale.getHtml());

    if (this.ruler) {
      sliderContainer.appendChild(this.ruler.getHtml());
    }

    this.toggles.forEach((toggle: IToggle) => {
      const toggleHtml = toggle.main.getHtml();
      if (toggle.thumb) toggleHtml.appendChild(toggle.thumb.getHtml());
      sliderContainer.appendChild(toggleHtml);
    });

    sliderDom.appendChild(sliderContainer);
    return sliderDom;
  };

  private saveDom = () => {
    this.slider = this.domParent.querySelector(`.${sliderClassNames.slider}`);
    this.saveScaleDom();
    this.saveTogglesDom();

    if (this.ruler) {
      this.saveRuler();
    }

    const { withThumb } = this.modelOptions;
    if (withThumb) {
      this.saveThumbDom();
    }
  };

  private saveScaleDom = () => this.scale.setDomNode(this.getScaleDom());

  private getScaleDom = () => {
    const bar = this.domParent.querySelector(`.${sliderClassNames.bar}`) as HTMLElement;
    const scale = this.domParent.querySelector(`.${sliderClassNames.scale}`) as HTMLElement;
    return { scale, bar };
  };

  private saveTogglesDom = () => {
    const domToggles = this.domParent.querySelectorAll(`.${sliderClassNames.toggle}`);
    domToggles.forEach((domToggle: HTMLElement, index) => {
      const domNode = {
        toggle: domToggle,
        handle: domToggle.querySelector(`.${sliderClassNames.handle}`) as HTMLElement,
      };

      this.toggles[index].main.setDomNode(domNode);
    });
  };

  private saveRuler = () => {
    const domRuler = this.domParent.querySelector(`.${sliderClassNames.ruler}`) as HTMLElement;
    this.ruler.setDomNode({ ruler: domRuler });
  };

  private saveThumbDom = () => {
    const domThumbs = this.domParent.querySelectorAll(`.${sliderClassNames.thumb}`);
    domThumbs.forEach((domThumb: HTMLElement, index) => {
      this.toggles[index].thumb.setDomNode({ thumb: domThumb });
    });
  };

  private setListeners = () => {
    if (this.ruler) {
      const { ruler } = this.ruler.getDomNode();
      ruler.addEventListener('click', this.onRulerClick);
    }

    this.toggles.forEach((toggle, toggleIndex: number) => {
      const { handle } = toggle.main.getDomNode();
      handle.addEventListener('mousedown', (evt: MouseEvent) => {
        this.onToggleMouseDown(evt, toggleIndex);
      });
    });
  };

  private onRulerClick = (evt: MouseEvent) => {
    const clickNode = evt.target as HTMLElement;
    const withRulerItem = clickNode.classList.contains(`${sliderClassNames.rulerItem}`);

    if (withRulerItem) {
      const newValue = +clickNode.textContent;
      const newSliderOptions = { ...this.modelOptions };
      const { currentValues } = newSliderOptions;

      if (this.isRange) {
        const { min, max } = currentValues;
        let newValueIndex;
        if (newValue < min) {
          newValueIndex = 0;
        }

        const isNewValueInDiapason = newValue > min && newValue < max;
        if (isNewValueInDiapason) {
          newValueIndex = Math.round(newValue / (min + max));
        }

        if (newValue > max) {
          newValueIndex = 1;
        }

        if (newValueIndex > 0) {
          currentValues.max = newValue;
        } else {
          currentValues.min = newValue;
        }
      } else {
        currentValues.min = newValue;
      }

      this.dispatchModelOptions(newSliderOptions);
    }
  };

  private onToggleMouseDown = (evt: MouseEvent, toggleIndex: number) => {
    evt.preventDefault();
    this.activeToggle = this.toggles[toggleIndex].main;
    this.activeToggleIndex = toggleIndex;
    this.toggles.forEach((toggle, index) => {
      const { toggle: toggleDom } = toggle.main.getDomNode();
      if (index === this.activeToggleIndex) {
        toggleDom.classList.add(sliderClassNames.toggleActive);
      } else {
        toggleDom.classList.remove(sliderClassNames.toggleActive);
      }
    });
    document.addEventListener('mousemove', this.onToggleMove);
    document.addEventListener('mouseup', this.onToggleUp);
  };

  private onToggleMove = (evt: MouseEvent) => {
    evt.preventDefault();
    this.changeCurrentValue({ x: evt.pageX, y: evt.pageY });
  };

  private onToggleUp = (evt: MouseEvent) => {
    evt.preventDefault();
    document.removeEventListener('mousemove', this.onToggleMove);
    document.removeEventListener('mouseup', this.onToggleUp);
  };

  private changeCurrentValue = (clickCoordinate: IClickCoordinate) => {
    const cleanCoordinate = this.getCleanCoordinate(clickCoordinate);
    const percentOfSlider = this.getPercent(cleanCoordinate);
    const newCurrentValue = this.getCurrentValueByPercent(percentOfSlider);
    const newSliderOptions = { ...this.modelOptions };

    const indexMap = {
      0: 'min',
      1: 'max',
    };

    const currentValueKey = indexMap[this.activeToggleIndex as 0 | 1];

    if (this.isRange) {
      const isFirstValue = this.activeToggleIndex === 0;
      const isLastValue = this.activeToggleIndex === 1;
      const minOutRange = isFirstValue
        ? newSliderOptions.currentValues.max
        : newSliderOptions.currentValues.min;
      const maxOutRange = isLastValue
        ? newSliderOptions.currentValues.min
        : newSliderOptions.currentValues.max;

      if (isFirstValue) {
        const isOutOfRange = newCurrentValue >= maxOutRange;
        newSliderOptions.currentValues[currentValueKey as 'min' | 'max'] = isOutOfRange
          ? maxOutRange
          : newCurrentValue;
      } else if (isLastValue) {
        const isOutOfRange = newCurrentValue <= minOutRange;
        newSliderOptions.currentValues[currentValueKey as 'min' | 'max'] = isOutOfRange
          ? minOutRange
          : newCurrentValue;
      }
    } else {
      newSliderOptions.currentValues[currentValueKey as 'min' | 'max'] = newCurrentValue;
    }

    this.dispatchModelOptions(newSliderOptions);
  };

  private getCleanCoordinate = (clickCoordinate: IClickCoordinate) => {
    const { toggle: activeToggle } = this.activeToggle.getDomNode();
    const halfHandleWidth = activeToggle.offsetWidth / 4;
    const leftToggleMargin = this.isVertical ? 5 : 7;
    const sliderOffset = this.isVertical ? this.slider.offsetTop : this.slider.offsetLeft;
    const interfering = sliderOffset - halfHandleWidth + leftToggleMargin;
    const cleanCoordinate = this.isVertical
      ? clickCoordinate.y - interfering
      : clickCoordinate.x - interfering;
    return cleanCoordinate;
  };

  private getPercent = (value: number) => {
    const offset = this.isVertical ? this.slider.offsetHeight : this.slider.offsetWidth;
    let percent = value / offset;
    if (percent > 1) percent = 1;
    if (percent < 0) percent = 0;
    return percent;
  };

  private getCurrentValueByPercent = (percent: number) => {
    const { range, step, maxDecimalPlace } = this.modelOptions;
    const newCurrentValue = percent * (range.max - range.min) + range.min;
    if (step) {
      return this.getStepCurrentValue(newCurrentValue);
    }

    return +newCurrentValue.toFixed(maxDecimalPlace);
  };

  private getStepCurrentValue = (currentValue: number) => {
    const { step, range, maxDecimalPlace } = this.modelOptions;
    let stepCurrentValue = Math.round((currentValue - range.min) / step) * step + range.min;
    const isLastStepLess = currentValue - range.max === 0;

    if (isLastStepLess) {
      stepCurrentValue = range.max;
    }

    if (stepCurrentValue >= range.max) {
      stepCurrentValue = range.max;
    }

    return +stepCurrentValue.toFixed(maxDecimalPlace);
  };

  private dispatchModelOptions = (modelOptions: IModelOptions) => {
    this.notify('modelOptionsUpdate', modelOptions);
  };

  private redrawValue = () => {
    this.scale.updateProps(this.getScaleProps());
    const { withRuler } = this.modelOptions;

    if (withRuler) {
      if (this.ruler) {
        if (this.hasRulerPropsChange()) {
          this.ruler.updateProps(this.getRulerProps());
        }
      } else {
        this.onRulerMount();
      }
    } else if (this.ruler) {
      if (this.hasRulerPropsChange()) {
        this.ruler.updateProps(this.getRulerProps());
      }
    }

    const { currentValues, withThumb } = this.modelOptions;

    Object.entries(currentValues).forEach(([key, value]) => {
      const toggleIndexMap = { min: 0, max: 1 };
      const index = toggleIndexMap[key as 'min' | 'max'];
      const scalePosition = this.scale.getPosition(value);
      const toggleProps: IToggleProps = { scalePosition, isVertical: this.isVertical };
      this.toggles[index].main.updateProps(toggleProps);

      const { thumb } = this.toggles[index];
      if (withThumb) {
        if (thumb) {
          thumb.updateProps(this.getThumbProps(value));
        } else {
          this.onThumbMount();
        }
      } else if (thumb) {
        thumb.updateProps(this.getThumbProps(value));
      }
    });
  };

  private hasRulerPropsChange = () => {
    const oldRulerProps = this.ruler.getProps();
    const newRulerProps = this.getRulerProps();
    return JSON.stringify(oldRulerProps) !== JSON.stringify(newRulerProps);
  };

  private onRulerMount = () => {
    this.ruler = new Ruler(this.getRulerProps());
    this.ruler.subscribe('onRulerHide', this.onRulerHide);
    const domRuler = this.ruler.getHtml() as HTMLElement;
    const domContainer = this.slider.querySelector(`.${sliderClassNames.wrap}`);
    domContainer.appendChild(domRuler);
    this.ruler.setDomNode({ ruler: domRuler });
    const { ruler } = this.ruler.getDomNode();
    ruler.addEventListener('click', this.onRulerClick);
  };

  private onThumbMount = () => {
    const { currentValues } = this.modelOptions;

    Object.entries(currentValues).forEach(([key, value]) => {
      const toggleIndexMap = { min: 0, max: 1 };
      const index = toggleIndexMap[key as 'min' | 'max'];
      const toggle = this.toggles[index];
      toggle.thumb = new Thumb(this.getThumbProps(value));
      toggle.thumb.subscribe('onThumbHide', this.onThumbHide);
      const domToggle = toggle.main.getDomNode().toggle;
      domToggle.appendChild(toggle.thumb.getHtml());
      const domThumb = domToggle.querySelector(`.${sliderClassNames.thumb}`) as HTMLElement;
      toggle.thumb.setDomNode({ thumb: domThumb });
    });
  };
}

export default View;
