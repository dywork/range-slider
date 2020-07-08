import Observer from '../Observer/Observer';
import IViewOptions from './IViewOptions';
import { IModelOptions } from '../Model/Model';
import { Scale, IScaleProps } from './components/Scale/Scale';
import { Toggle, IToggleProps } from './components/Toggle/Toggle';
import Thumb from './components/Thumb/Thumb';
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

  private getScaleProps = () : IScaleProps => {
    const { currentValue, range } = this.modelOptions;
    return { currentValue, range, isVertical: this.isVertical };
  };

  private mountSlider = () => {
    const sliderContainer = this.createSliderContainer();
    this.domParent.appendChild(sliderContainer);
  };

  private createSliderContainer = () => {
    const sliderContainer = document.createElement('div');
    sliderContainer.classList.add(sliderClassName.slider);

    if (this.isVertical) {
      sliderContainer.classList.add(sliderClassName.sliderVertical);
    }

    sliderContainer.appendChild(this.scale.getHtml());

    this.toggles.forEach((toggle: IToggle) => {
      const toggleHtml = toggle.main.getHtml();
      if (toggle.thumb) toggleHtml.appendChild(toggle.thumb.getHtml());
      sliderContainer.appendChild(toggleHtml);
    });

    return sliderContainer;
  };

  private saveDom = () => {
    this.slider = this.domParent.querySelector(`.${sliderClassName.slider}`);
    this.saveScaleDom();
    this.saveTogglesDom();
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

  private saveThumbDom = () => {
    const domThumbs = this.domParent.querySelectorAll(`.${sliderClassName.thumb}`);
    domThumbs.forEach((domThumb: HTMLElement, index) => {
      this.toggles[index].thumb.setDomNode({ thumb: domThumb });
    });
  };

  private setListeners = () => {
    this.toggles.forEach((toggle, toggleIndex: number) => {
      const { handle } = toggle.main.getDomNode();
      handle.addEventListener('mousedown', (evt: MouseEvent) => {
        this.onToggleMouseDown(evt, toggleIndex);
      });
    });
  };

  private onToggleMouseDown = (evt: MouseEvent, toggleIndex: number) => {
    evt.preventDefault();
    this.activeToggle = this.toggles[toggleIndex].main;
    this.activeToggleIndex = toggleIndex;
    const { toggle: activeToggle } = this.activeToggle.getDomNode();
    activeToggle.classList.add(sliderClassName.toggleActive);
    document.addEventListener('mousemove', this.onToggleMove);
    document.addEventListener('mouseup', this.onToggleUp);
  };

  private onToggleMove = (evt: MouseEvent) => {
    evt.preventDefault();
    this.changeCurrentValue({ x: evt.pageX, y: evt.pageY });
  };

  private onToggleUp = (evt: MouseEvent) => {
    evt.preventDefault();
    const { toggle: activeToggle } = this.activeToggle.getDomNode();
    activeToggle.classList.remove(sliderClassName.toggleActive);
    document.removeEventListener('mousemove', this.onToggleMove);
    document.removeEventListener('mouseup', this.onToggleUp);
  };

  private changeCurrentValue = (clickCoord: IClickCoord) => {
    const cleanCoord = this.getCleanCoord(clickCoord);
    const percentOfSlider = this.getPercent(cleanCoord);
    const newCurrentValue = this.getCurrentValueByPercent(percentOfSlider);
    const newModelOptions = { ...this.modelOptions };

    if (newModelOptions.currentValue instanceof Array) {
      newModelOptions.currentValue[this.activeToggleIndex] = newCurrentValue;
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
