import Observer from '../Observer/Observer';
import IViewOptions from './IViewOptions';
import { IModelOptions } from '../Model/Model';
import { Scale, IScaleProps } from './components/Scale/Scale';
import { Toggle, IToggleProps } from './components/Toggle/Toggle';
import Thumb from './components/Thumb/Thumb';
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
  private viewOptions: IViewOptions;

  private modelOptions: IModelOptions;

  private domParent: HTMLElement;

  private slider: HTMLElement;

  private scale: Scale;

  private ruler: Ruler | null;

  private toggles: IToggle[];

  private activeToggle: Toggle;

  private activeToggleIndex: number;

  private isVertical: boolean;

  constructor(viewOptions: IViewOptions, modelOptions: IModelOptions) {
    super();
    this.viewOptions = viewOptions;
    this.modelOptions = modelOptions;
    this.domParent = this.viewOptions.domParent;
    this.isVertical = this.viewOptions.orientation === 'vertical';
    this.scale = this.getScale();
    this.ruler = this.getRuler();
    this.toggles = this.getToggles();
  }

  render = () => {
    this.mountSlider();
    this.saveDom();
    this.setListeners();
  };

  updateSliderOptions = (newSliderOptions: IModelOptions) => {
    this.modelOptions = newSliderOptions;
    this.redrawValue();
  };

  private redrawValue = () => {
    this.scale.updateProps(this.getScaleProps());
    const { currentValue } = this.modelOptions;
    if (currentValue instanceof Array) {
      currentValue.forEach((value, index) => {
        const scalePosition = this.scale.getPosition(value);
        const toggleProps: IToggleProps = { scalePosition, isVertical: this.isVertical };
        this.toggles[index].main.updateProps(toggleProps);
        this.toggles[index].thumb.updateValue(value);
      });
    } else {
      const scalePosition = this.scale.getPosition(currentValue);
      const toggleProps: IToggleProps = { scalePosition, isVertical: this.isVertical };
      this.toggles[0].main.updateProps(toggleProps);
      this.toggles[0].thumb.updateValue(currentValue);
    }
  };

  private dispatchSliderOptions = (newSliderOptions: IModelOptions) => {
    this.notify('sliderOptionsUpdate', newSliderOptions);
  };

  private getToggles = () => {
    const { currentValue } = this.modelOptions;
    const { isThumb } = this.viewOptions;

    if (currentValue instanceof Array) {
      return currentValue.map((value: number) => {
        const scalePosition = this.scale.getPosition(value);
        const toggleProps: IToggleProps = { scalePosition, isVertical: this.isVertical };
        const toggle = {
          main: new Toggle(toggleProps),
          thumb: isThumb ? new Thumb(value) : null,
        };

        return toggle;
      });
    }

    const scalePosition = this.scale.getPosition(currentValue);
    const toggleProps: IToggleProps = { scalePosition, isVertical: this.isVertical };
    const toggle = {
      main: new Toggle(toggleProps),
      thumb: isThumb ? new Thumb(currentValue) : null,
    };

    return [toggle];
  };

  private getScale = () => new Scale(this.getScaleProps());

  private getScaleProps = (): IScaleProps => {
    const { currentValue, range } = this.modelOptions;
    return { currentValue, range, isVertical: this.isVertical };
  };

  private getRuler = () => {
    const { isRuler } = this.viewOptions;
    if (isRuler) {
      return new Ruler(this.getRulerProps());
    }

    return null;
  };

  private getRulerProps = (): IRulerProps => {
    const { range, step } = this.modelOptions;
    if (!step) {
      return { range, step: 1, isVertical: this.isVertical };
    }

    return { range, step, isVertical: this.isVertical };
  };

  private mountSlider = () => {
    const sliderContainer = this.createSliderContainer();
    this.domParent.appendChild(sliderContainer);
  };

  private createSliderContainer = () => {
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

  private saveDom = () => {
    this.slider = this.domParent.querySelector(`.${sliderClassName.slider}`);
    this.saveScaleDom();
    this.saveTogglesDom();

    if (this.ruler) {
      this.saveRuler();
    }

    const { isThumb } = this.viewOptions;
    if (isThumb) {
      this.saveThumbDom();
    }
  };

  private saveScaleDom = () => this.scale.setDomNode(this.getScaleDom());

  private getScaleDom = () => {
    const bar = this.domParent.querySelector(`.${sliderClassName.bar}`) as HTMLElement;
    const scale = this.domParent.querySelector(`.${sliderClassName.scale}`) as HTMLElement;
    return { scale, bar };
  };

  private saveTogglesDom = () => {
    const domToggles = this.domParent.querySelectorAll(`.${sliderClassName.toggle}`);
    domToggles.forEach((domToggle: HTMLElement, index) => {
      const domNode = {
        toggle: domToggle,
        handle: domToggle.querySelector(`.${sliderClassName.handle}`) as HTMLElement,
      };

      this.toggles[index].main.setDomNode(domNode);
    });
  };

  private saveRuler = () => {
    const domRuler = this.domParent.querySelector(`.${sliderClassName.ruler}`) as HTMLElement;
    this.ruler.setDomNode({ ruler: domRuler });
  };

  private saveThumbDom = () => {
    const domThumbs = this.domParent.querySelectorAll(`.${sliderClassName.thumb}`);
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
    const newValue = +clickNode.textContent;
    const newModelOptions = { ...this.modelOptions };
    if (newModelOptions.currentValue instanceof Array) {
      const minValue = newModelOptions.currentValue[0];
      const maxValue = newModelOptions.currentValue[1];
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

      newModelOptions.currentValue[newValueIndex] = newValue;
    } else {
      newModelOptions.currentValue = newValue;
    }
    this.dispatchSliderOptions(newModelOptions);
  };

  private onToggleMouseDown = (evt: MouseEvent, toggleIndex: number) => {
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

  private changeCurrentValue = (clickCoord: IClickCoord) => {
    const cleanCoord = this.getCleanCoord(clickCoord);
    const percentOfSlider = this.getPercent(cleanCoord);
    const newCurrentValue = this.getCurrentValueByPercent(percentOfSlider);
    const newModelOptions = { ...this.modelOptions };

    if (newModelOptions.currentValue instanceof Array) {
      const isFirstValue = this.activeToggleIndex === 0;
      const isLastValue = this.activeToggleIndex === newModelOptions.currentValue.length - 1;
      const minOutRange = isFirstValue
        ? newModelOptions.currentValue[this.activeToggleIndex]
        : newModelOptions.currentValue[this.activeToggleIndex - 1];
      const maxOutRange = isLastValue
        ? newModelOptions.currentValue[this.activeToggleIndex]
        : newModelOptions.currentValue[this.activeToggleIndex + 1];

      if (isFirstValue) {
        const isOutOfRange = newCurrentValue >= maxOutRange;
        newModelOptions.currentValue[this.activeToggleIndex] = isOutOfRange
          ? maxOutRange
          : newCurrentValue;
      } else if (isLastValue) {
        const isOutOfRange = newCurrentValue <= minOutRange;
        newModelOptions.currentValue[this.activeToggleIndex] = isOutOfRange
          ? minOutRange
          : newCurrentValue;
      }
    } else {
      newModelOptions.currentValue = newCurrentValue;
    }

    this.dispatchSliderOptions(newModelOptions);
  };

  private getCleanCoord = (clickCoord: IClickCoord) => {
    const { toggle: activeToggle } = this.activeToggle.getDomNode();
    const halfHandleWidth = activeToggle.offsetWidth / 4;
    const leftToggleMargin = this.isVertical ? 5 : 7;
    const sliderOffset = this.isVertical ? this.slider.offsetTop : this.slider.offsetLeft;
    const interfering = sliderOffset - halfHandleWidth + leftToggleMargin;
    const cleanCoord = this.isVertical ? clickCoord.y - interfering : clickCoord.x - interfering;
    return cleanCoord;
  };

  private getPercent = (value: number) => {
    const offset = this.isVertical ? this.slider.offsetHeight : this.slider.offsetWidth;
    let percent = value / offset;
    if (percent > 1) percent = 1;
    if (percent < 0) percent = 0;
    return percent;
  };

  private getCurrentValueByPercent = (percent: number) => {
    const { range, step } = this.modelOptions;
    const { decimal } = this.viewOptions;
    const newCurrentValue = percent * (range.max - range.min) + range.min;
    if (step) {
      return this.getStepCurrentValue(newCurrentValue);
    }

    return +newCurrentValue.toFixed(decimal);
  };

  private getStepCurrentValue = (currentValue: number) => {
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
}

export default View;
