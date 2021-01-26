import Observer from '../Observer/Observer';
import ISliderOptions from '../ISliderOptions';
import { Scale, IScaleProps } from './components/Scale/Scale';
import { Toggle, IToggleProps } from './components/Toggle/Toggle';
import { Thumb, IThumbProps } from './components/Thumb/Thumb';
import { Ruler, IRulerProps } from './components/Ruler/Ruler';
import sliderClassName from './utils/sliderClassName';

interface IToggle {
  main: Toggle;
  thumb: Thumb | null;
}

interface IClickCoord {
  x: number;
  y: number;
}

class View extends Observer {
  private sliderOptions: ISliderOptions;

  private domParent: HTMLElement;

  private slider: HTMLElement;

  private scale: Scale;

  private ruler: Ruler | null;

  private toggles: IToggle[];

  private activeToggle: Toggle;

  private activeToggleIndex: number;

  private isVertical: boolean;

  constructor(sliderOptions: ISliderOptions) {
    super();
    this.sliderOptions = sliderOptions;
    this.domParent = this.sliderOptions.domParent;
    this.isVertical = this.sliderOptions.orientation === 'vertical';
    this.scale = this._getScale();
    this.ruler = this._getRuler();
    this.toggles = this._getToggles();
  }

  render = () => {
    this._mountSlider();
    this._saveDom();
    this._setListeners();
  };

  destroyDom = () => {
    this.domParent.removeChild(this.slider);
  };

  updateSliderOptions = (newSliderOptions: ISliderOptions) => {
    this.sliderOptions = newSliderOptions;
    this._redrawValue();
  };

  private _redrawValue = () => {
    this.scale.updateProps(this._getScaleProps());
    const { isRuler } = this.sliderOptions;

    if (isRuler) {
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

    const { currentValue, isThumb } = this.sliderOptions;

    if (currentValue instanceof Array) {
      currentValue.forEach((value, index) => {
        const scalePosition = this.scale.getPosition(value);
        const toggleProps: IToggleProps = { scalePosition, isVertical: this.isVertical };
        this.toggles[index].main.updateProps(toggleProps);

        const { thumb } = this.toggles[index];
        if (isThumb) {
          if (thumb) {
            thumb.updateProps(this._getThumbProps(value));
          } else {
            this._onThumbMount();
          }
        } else if (thumb) {
          thumb.updateProps(this._getThumbProps(value));
        }
      });
    } else {
      const scalePosition = this.scale.getPosition(currentValue);
      const toggleProps: IToggleProps = { scalePosition, isVertical: this.isVertical };
      this.toggles[0].main.updateProps(toggleProps);

      const { thumb } = this.toggles[0];
      if (isThumb) {
        if (thumb) {
          thumb.updateProps(this._getThumbProps(currentValue));
        } else {
          this._onThumbMount();
        }
      } else if (thumb) {
        thumb.updateProps(this._getThumbProps(currentValue));
      }
    }
  };

  private _hasRulerPropsChange = () => {
    const oldRulerProps = this.ruler.getProps();
    const newRulerProps = this._getRulerProps();
    return JSON.stringify(oldRulerProps) !== JSON.stringify(newRulerProps);
  };

  private _dispatchSliderOptions = (newSliderOptions: ISliderOptions) => {
    this.notify('sliderOptionsUpdate', newSliderOptions);
  };

  private _getToggles = () => {
    const { currentValue, isThumb } = this.sliderOptions;

    if (currentValue instanceof Array) {
      return currentValue.map((value: number) => {
        const scalePosition = this.scale.getPosition(value);
        const toggleProps: IToggleProps = { scalePosition, isVertical: this.isVertical };
        const toggle = {
          main: new Toggle(toggleProps),
          thumb: isThumb ? new Thumb(this._getThumbProps(value)) : null,
        };

        if (toggle.thumb) {
          toggle.thumb.subscribe('onThumbHide', this._onThumbHide);
        }

        return toggle;
      });
    }

    const scalePosition = this.scale.getPosition(currentValue);
    const toggleProps: IToggleProps = { scalePosition, isVertical: this.isVertical };
    const toggle = {
      main: new Toggle(toggleProps),
      thumb: isThumb ? new Thumb(this._getThumbProps(currentValue)) : null,
    };

    if (toggle.thumb) {
      toggle.thumb.subscribe('onThumbHide', this._onThumbHide);
    }

    return [toggle];
  };

  private _getThumbProps = (value: number): IThumbProps => {
    const { isThumb } = this.sliderOptions;
    return { isThumb, value };
  };

  private _getScale = () => new Scale(this._getScaleProps());

  private _getScaleProps = (): IScaleProps => {
    const { currentValue, range } = this.sliderOptions;
    return { currentValue, range, isVertical: this.isVertical };
  };

  private _getRuler = () => {
    const { isRuler } = this.sliderOptions;

    if (isRuler) {
      const ruler = new Ruler(this._getRulerProps());
      ruler.subscribe('onRulerHide', this._onRulerHide);
      return ruler;
    }

    return null;
  };

  private _getRulerProps = (): IRulerProps => {
    const { range, step, isRuler } = this.sliderOptions;
    if (!step) {
      return {
        range,
        step: 1,
        isRuler,
        isVertical: this.isVertical,
      };
    }

    return {
      range,
      step,
      isRuler,
      isVertical: this.isVertical,
    };
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

    const { isThumb } = this.sliderOptions;
    if (isThumb) {
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

  private _onRulerHide = () => {
    if (this.ruler) {
      this.ruler.destroyDom();
      this.ruler = null;
    }
  };

  private _onRulerClick = (evt: MouseEvent) => {
    const clickNode = evt.target as HTMLElement;
    const isRulerItem = clickNode.classList.contains(`${sliderClassName.rulerItem}`);

    if (isRulerItem) {
      const newValue = +clickNode.textContent;
      const newSliderOptions = { ...this.sliderOptions };
      if (newSliderOptions.currentValue instanceof Array) {
        const minValue = newSliderOptions.currentValue[0];
        const maxValue = newSliderOptions.currentValue[1];
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

        newSliderOptions.currentValue[newValueIndex] = newValue;
      } else {
        newSliderOptions.currentValue = newValue;
      }
      this._dispatchSliderOptions(newSliderOptions);
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

  private _onThumbMount = () => {
    const { currentValue } = this.sliderOptions;

    if (currentValue instanceof Array) {
      currentValue.forEach((value: number, index: number) => {
        const toggle = this.toggles[index];
        toggle.thumb = new Thumb(this._getThumbProps(value));
        toggle.thumb.subscribe('onThumbHide', this._onThumbHide);
        const domToggle = toggle.main.getDomNode().toggle;
        domToggle.appendChild(toggle.thumb.getHtml());
        const domThumb = domToggle.querySelector(`.${sliderClassName.thumb}`) as HTMLElement;
        toggle.thumb.setDomNode({ thumb: domThumb });
      });
    } else {
      const toggle = this.toggles[0];
      toggle.thumb = new Thumb(this._getThumbProps(currentValue));
      toggle.thumb.subscribe('onThumbHide', this._onThumbHide);
      const domToggle = toggle.main.getDomNode().toggle;
      domToggle.appendChild(toggle.thumb.getHtml());
      const domThumb = domToggle.querySelector(`.${sliderClassName.thumb}`) as HTMLElement;
      toggle.thumb.setDomNode({ thumb: domThumb });
    }
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

  private _changeCurrentValue = (clickCoord: IClickCoord) => {
    const cleanCoord = this._getCleanCoord(clickCoord);
    const percentOfSlider = this._getPercent(cleanCoord);
    const newCurrentValue = this._getCurrentValueByPercent(percentOfSlider);
    const newSliderOptions = { ...this.sliderOptions };

    if (newSliderOptions.currentValue instanceof Array) {
      const isFirstValue = this.activeToggleIndex === 0;
      const isLastValue = this.activeToggleIndex === newSliderOptions.currentValue.length - 1;
      const minOutRange = isFirstValue
        ? newSliderOptions.currentValue[this.activeToggleIndex]
        : newSliderOptions.currentValue[this.activeToggleIndex - 1];
      const maxOutRange = isLastValue
        ? newSliderOptions.currentValue[this.activeToggleIndex]
        : newSliderOptions.currentValue[this.activeToggleIndex + 1];

      if (isFirstValue) {
        const isOutOfRange = newCurrentValue >= maxOutRange;
        newSliderOptions.currentValue[this.activeToggleIndex] = isOutOfRange
          ? maxOutRange
          : newCurrentValue;
      } else if (isLastValue) {
        const isOutOfRange = newCurrentValue <= minOutRange;
        newSliderOptions.currentValue[this.activeToggleIndex] = isOutOfRange
          ? minOutRange
          : newCurrentValue;
      }
    } else {
      newSliderOptions.currentValue = newCurrentValue;
    }

    this._dispatchSliderOptions(newSliderOptions);
  };

  private _getCleanCoord = (clickCoord: IClickCoord) => {
    const { toggle: activeToggle } = this.activeToggle.getDomNode();
    const halfHandleWidth = activeToggle.offsetWidth / 4;
    const leftToggleMargin = this.isVertical ? 5 : 7;
    const sliderOffset = this.isVertical ? this.slider.offsetTop : this.slider.offsetLeft;
    const interfering = sliderOffset - halfHandleWidth + leftToggleMargin;
    const cleanCoord = this.isVertical ? clickCoord.y - interfering : clickCoord.x - interfering;
    return cleanCoord;
  };

  private _getPercent = (value: number) => {
    const offset = this.isVertical ? this.slider.offsetHeight : this.slider.offsetWidth;
    let percent = value / offset;
    if (percent > 1) percent = 1;
    if (percent < 0) percent = 0;
    return percent;
  };

  private _getCurrentValueByPercent = (percent: number) => {
    const { range, step } = this.sliderOptions;
    const newCurrentValue = percent * (range.max - range.min) + range.min;
    if (step) {
      return this._getStepCurrentValue(newCurrentValue);
    }

    return +newCurrentValue.toFixed();
  };

  private _getStepCurrentValue = (currentValue: number) => {
    const { step, range } = this.sliderOptions;
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
}

export default View;
