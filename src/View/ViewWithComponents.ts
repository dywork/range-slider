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

  private scale: Scale;

  private toggles: IToggle[];

  private activeToggle: Toggle;

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

  updateSliderOptions = (newSliderOptions: IModelOptions) => {
    this.modelOptions = newSliderOptions;
    // this.redrawValue();
  };

  render = () => {
    this.mountSlider();
    this.saveDom();
    this.setListeners();
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

  private getScale = () => {
    const { currentValue, range } = this.modelOptions;
    const scaleProps: IScaleProps = { currentValue, range, isVertical: this.isVertical };
    return new Scale(scaleProps);
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
    this.saveScaleDom();
    this.saveTogglesDom();
    const { isThumb } = this.viewOptions;
    if (isThumb) {
      this.saveThumbDom();
    }
    console.log(this.scale.getDomNode());
    this.toggles.forEach((item) => {
      console.log(item.main.getDomNode());
      console.log(item.thumb.getDomNode());
    });
  };

  private saveScaleDom = () => this.scale.setDomNode(this.getScaleDom());

  private getScaleDom = () => {
    const bar = this.domParent.querySelector(`.${sliderClassName.bar}`);
    const scale = this.domParent.querySelector(`.${sliderClassName.scale}`);
    return { scale, bar };
  };

  private saveTogglesDom = () => {
    const domToggles = this.domParent.querySelectorAll(`.${sliderClassName.toggle}`);
    domToggles.forEach((domToggle, index) => {
      const domNode = {
        toggle: domToggle,
        handle: domToggle.querySelector(`.${sliderClassName.handle}`),
      };

      this.toggles[index].main.setDomNode(domNode);
    });
  };

  private saveThumbDom = () => {
    const domThumbs = this.domParent.querySelectorAll(`.${sliderClassName.thumb}`);
    domThumbs.forEach((domThumb, index) => {
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

  private changeCurrentValue = (clickCoord: IClickCoord) => {};
}

export default View;
