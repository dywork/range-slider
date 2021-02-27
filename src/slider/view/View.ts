import Ruler from './components/ruler/Ruler';
import Scale from './components/scale/Scale';
import Thumb from './components/thumb/Thumb';
import Toggle from './components/toggle/Toggle';
import sliderClassName from './utils/sliderClassName';
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

  private isDiapason: boolean;

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
    this.isDiapason = currentValues.length === 2;
    this._initViewComponents();
  }

  render = () => {
    this._mountSlider();
    this._saveDom();
    this._setListeners();
  };

  destroyDom = () => {
    this.domParent.removeChild(this.slider);
  };

  updateModelOptions = (modelOptions: IModelOptions) => {
    this.modelOptions = modelOptions;
    this._redrawValue();
  };

  private _initViewComponents = () => {
    const { withRuler } = this.modelOptions;

    if (withRuler) {
      this.ruler = this._getRuler();
    } else {
      this.ruler = null;
    }

    this.scale = this._getScale();
    this.toggles = this._getToggles();
  };

  private _getRuler = () => {
    const ruler = new Ruler(this._getRulerProps());
    ruler.subscribe('onRulerHide', this._onRulerHide);
    return ruler;
  };

  private _getRulerProps = (): IRulerProps => {
    const { range, step, withRuler } = this.modelOptions;
    if (!step) {
      return {
        range,
        step: 1,
        withRuler,
        isVertical: this.isVertical,
      };
    }

    return {
      range,
      step,
      withRuler,
      isVertical: this.isVertical,
    };
  };

  private _onRulerHide = () => {
    if (this.ruler) {
      this.ruler.destroyDom();
      this.ruler = null;
    }
  };

  private _getScale = () => new Scale(this._getScaleProps());

  private _getScaleProps = (): IScaleProps => {
    const { currentValues, range } = this.modelOptions;
    return { currentValues, range, isVertical: this.isVertical };
  };

  private _getToggles = () => {
    const { currentValues, withThumb } = this.modelOptions;

    return currentValues.map((value: number) => {
      const scalePosition = this.scale.getPosition(value);
      const toggleProps: IToggleProps = { scalePosition, isVertical: this.isVertical };
      const toggle = {
        main: new Toggle(toggleProps),
        thumb: withThumb ? new Thumb(this._getThumbProps(value)) : null,
      };

      if (toggle.thumb) {
        toggle.thumb.subscribe('onThumbHide', this._onThumbHide);
      }

      return toggle;
    });
  };

  private _getThumbProps = (value: number) => {
    const { withThumb } = this.modelOptions;
    return { withThumb, value };
  };

  private _onThumbHide = () => {
    this.toggles.forEach((toggle: IToggle) => {
      if (toggle.thumb) {
        toggle.thumb.destroyDom();
        // eslint-disable-next-line no-param-reassign
        toggle.thumb = null;
      }
    });
  };

  private _mountSlider = () => {
    this.domParent.appendChild(this._createSliderContainer());
  };

  private _createSliderContainer = () => {
    const sliderDom = document.createElement('div');
    sliderDom.classList.add(sliderClassName.slider);
    const sliderContainer = document.createElement('div');
    sliderContainer.classList.add(sliderClassName.wrap);

    if (this.isVertical) {
      sliderContainer.classList.add(sliderClassName.sliderVertical);
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

  private _saveDom = () => {
    this.slider = this.domParent.querySelector(`.${sliderClassName.slider}`);
    this._saveScaleDom();
    this._saveTogglesDom();

    if (this.ruler) {
      this._saveRuler();
    }

    const { withThumb } = this.modelOptions;
    if (withThumb) {
      this._saveThumbDom();
    }
  };

  private _saveScaleDom = () => this.scale.setDomNode(this._getScaleDom());

  private _getScaleDom = () => {
    const bar = this.domParent.querySelector(`.${sliderClassName.bar}`) as HTMLElement;
    const scale = this.domParent.querySelector(`.${sliderClassName.scale}`) as HTMLElement;
    return { scale, bar };
  };

  private _saveTogglesDom = () => {
    const domToggles = this.domParent.querySelectorAll(`.${sliderClassName.toggle}`);
    domToggles.forEach((domToggle: HTMLElement, index) => {
      const domNode = {
        toggle: domToggle,
        handle: domToggle.querySelector(`.${sliderClassName.handle}`) as HTMLElement,
      };

      this.toggles[index].main.setDomNode(domNode);
    });
  };

  private _saveRuler = () => {
    const domRuler = this.domParent.querySelector(`.${sliderClassName.ruler}`) as HTMLElement;
    this.ruler.setDomNode({ ruler: domRuler });
  };

  private _saveThumbDom = () => {
    const domThumbs = this.domParent.querySelectorAll(`.${sliderClassName.thumb}`);
    domThumbs.forEach((domThumb: HTMLElement, index) => {
      this.toggles[index].thumb.setDomNode({ thumb: domThumb });
    });
  };

  private _setListeners = () => {
    if (this.ruler) {
      const { ruler } = this.ruler.getDomNode();
      ruler.addEventListener('click', this._onRulerClick);
    }

    this.toggles.forEach((toggle, toggleIndex: number) => {
      const { handle } = toggle.main.getDomNode();
      handle.addEventListener('mousedown', (evt: MouseEvent) => {
        this._onToggleMouseDown(evt, toggleIndex);
      });
    });
  };

  private _onRulerClick = (evt: MouseEvent) => {
    const clickNode = evt.target as HTMLElement;
    const withRulerItem = clickNode.classList.contains(`${sliderClassName.rulerItem}`);

    if (withRulerItem) {
      const newValue = +clickNode.textContent;
      const newSliderOptions = { ...this.modelOptions };
      const { currentValues } = newSliderOptions;

      if (this.isDiapason) {
        const minValue = currentValues[0];
        const maxValue = currentValues[1];
        let newValueIndex;
        if (newValue < minValue) {
          newValueIndex = 0;
        }

        if (newValue > minValue && newValue < maxValue) {
          newValueIndex = Math.round(newValue / (minValue + maxValue));
        }

        if (newValue > maxValue) {
          newValueIndex = 1;
        }

        currentValues[newValueIndex] = newValue;
      } else {
        currentValues[0] = newValue;
      }

      this._dispatchModelOptions(newSliderOptions);
    }
  };

  private _onToggleMouseDown = (evt: MouseEvent, toggleIndex: number) => {
    evt.preventDefault();
    this.activeToggle = this.toggles[toggleIndex].main;
    this.activeToggleIndex = toggleIndex;
    this.toggles.forEach((toggle, index) => {
      const { toggle: toggleDom } = toggle.main.getDomNode();
      if (index === this.activeToggleIndex) {
        toggleDom.classList.add(sliderClassName.toggleActive);
      } else {
        toggleDom.classList.remove(sliderClassName.toggleActive);
      }
    });
    document.addEventListener('mousemove', this._onToggleMove);
    document.addEventListener('mouseup', this._onToggleUp);
  };

  private _onToggleMove = (evt: MouseEvent) => {
    evt.preventDefault();
    this._changeCurrentValue({ x: evt.pageX, y: evt.pageY });
  };

  private _onToggleUp = (evt: MouseEvent) => {
    evt.preventDefault();
    document.removeEventListener('mousemove', this._onToggleMove);
    document.removeEventListener('mouseup', this._onToggleUp);
  };

  private _changeCurrentValue = (clickCoordinate: IClickCoordinate) => {
    const cleanCoordinate = this._getCleanCoordinate(clickCoordinate);
    const percentOfSlider = this._getPercent(cleanCoordinate);
    const newCurrentValue = this._getCurrentValueByPercent(percentOfSlider);
    const newSliderOptions = { ...this.modelOptions };

    if (this.isDiapason) {
      const isFirstValue = this.activeToggleIndex === 0;
      const isLastValue = this.activeToggleIndex === newSliderOptions.currentValues.length - 1;
      const minOutRange = isFirstValue
        ? newSliderOptions.currentValues[this.activeToggleIndex]
        : newSliderOptions.currentValues[this.activeToggleIndex - 1];
      const maxOutRange = isLastValue
        ? newSliderOptions.currentValues[this.activeToggleIndex]
        : newSliderOptions.currentValues[this.activeToggleIndex + 1];

      if (isFirstValue) {
        const isOutOfRange = newCurrentValue >= maxOutRange;
        newSliderOptions.currentValues[this.activeToggleIndex] = isOutOfRange
          ? maxOutRange
          : newCurrentValue;
      } else if (isLastValue) {
        const isOutOfRange = newCurrentValue <= minOutRange;
        newSliderOptions.currentValues[this.activeToggleIndex] = isOutOfRange
          ? minOutRange
          : newCurrentValue;
      }
    } else {
      newSliderOptions.currentValues[0] = newCurrentValue;
    }

    this._dispatchModelOptions(newSliderOptions);
  };

  private _getCleanCoordinate = (clickCoordinate: IClickCoordinate) => {
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

  private _getPercent = (value: number) => {
    const offset = this.isVertical ? this.slider.offsetHeight : this.slider.offsetWidth;
    let percent = value / offset;
    if (percent > 1) percent = 1;
    if (percent < 0) percent = 0;
    return percent;
  };

  private _getCurrentValueByPercent = (percent: number) => {
    const { range, step } = this.modelOptions;
    const newCurrentValue = percent * (range.max - range.min) + range.min;
    if (step) {
      return this._getStepCurrentValue(newCurrentValue);
    }

    return +newCurrentValue.toFixed();
  };

  private _getStepCurrentValue = (currentValue: number) => {
    const { step, range } = this.modelOptions;
    let stepCurrentValue = Math.round((currentValue - range.min) / step) * step + range.min;
    const isLastStepLess = +currentValue.toFixed() - range.max === 0;

    if (isLastStepLess) {
      stepCurrentValue = range.max;
    }

    if (stepCurrentValue >= range.max) {
      stepCurrentValue = range.max;
    }

    return stepCurrentValue;
  };

  private _dispatchModelOptions = (modelOptions: IModelOptions) => {
    this.notify('modelOptionsUpdate', modelOptions);
  };

  private _redrawValue = () => {
    this.scale.updateProps(this._getScaleProps());
    const { withRuler } = this.modelOptions;

    if (withRuler) {
      if (this.ruler) {
        if (this._hasRulerPropsChange()) {
          this.ruler.updateProps(this._getRulerProps());
        }
      } else {
        this._onRulerMount();
      }
    } else if (this.ruler) {
      if (this._hasRulerPropsChange()) {
        this.ruler.updateProps(this._getRulerProps());
      }
    }

    const { currentValues, withThumb } = this.modelOptions;

    currentValues.forEach((value, index) => {
      const scalePosition = this.scale.getPosition(value);
      const toggleProps: IToggleProps = { scalePosition, isVertical: this.isVertical };
      this.toggles[index].main.updateProps(toggleProps);

      const { thumb } = this.toggles[index];
      if (withThumb) {
        if (thumb) {
          thumb.updateProps(this._getThumbProps(value));
        } else {
          this._onThumbMount();
        }
      } else if (thumb) {
        thumb.updateProps(this._getThumbProps(value));
      }
    });
  };

  private _hasRulerPropsChange = () => {
    const oldRulerProps = this.ruler.getProps();
    const newRulerProps = this._getRulerProps();
    return JSON.stringify(oldRulerProps) !== JSON.stringify(newRulerProps);
  };

  private _onRulerMount = () => {
    this.ruler = new Ruler(this._getRulerProps());
    this.ruler.subscribe('onRulerHide', this._onRulerHide);
    const domRuler = this.ruler.getHtml() as HTMLElement;
    const domContainer = this.slider.querySelector(`.${sliderClassName.wrap}`);
    domContainer.appendChild(domRuler);
    this.ruler.setDomNode({ ruler: domRuler });
    const { ruler } = this.ruler.getDomNode();
    ruler.addEventListener('click', this._onRulerClick);
  };

  private _onThumbMount = () => {
    const { currentValues } = this.modelOptions;

    currentValues.forEach((value: number, index: number) => {
      const toggle = this.toggles[index];
      toggle.thumb = new Thumb(this._getThumbProps(value));
      toggle.thumb.subscribe('onThumbHide', this._onThumbHide);
      const domToggle = toggle.main.getDomNode().toggle;
      domToggle.appendChild(toggle.thumb.getHtml());
      const domThumb = domToggle.querySelector(`.${sliderClassName.thumb}`) as HTMLElement;
      toggle.thumb.setDomNode({ thumb: domThumb });
    });
  };
}

export default View;
