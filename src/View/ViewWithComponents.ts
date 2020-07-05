import Observer from '../Observer/Observer';
import IViewOptions from './IViewOptions';
import { IModelOptions } from '../Model/Model';
import Scale from './components/Scale/Scale';
import Toggle from './components/Toggle/Toggle';
import Thumb from './components/Thumb/Thumb';

interface IView {
  render(): void;
}

class View extends Observer implements IView {
  private viewOptions: IViewOptions;

  private modelOptions: IModelOptions;

  private isVertical: boolean;

  constructor(viewOptions: IViewOptions, modelOptions: IModelOptions) {
    super();
    this.viewOptions = viewOptions;
    this.modelOptions = modelOptions;
    this.isVertical = this.viewOptions.orientation === 'vertical';
  }

  updateSliderOptions = (newSliderOptions: IModelOptions) => {
    this.modelOptions = newSliderOptions;
    // this.redrawValue();
  };

  render = () => {
    const container = document.createElement('div');
    const scale = new Scale(this.modelOptions, this.isVertical);
    const toggle = new Toggle(scale.getPosition(), this.isVertical).getHtml();
    const thumb = new Thumb(this.modelOptions.currentValue).getHtml();
    toggle.appendChild(thumb);
    container.appendChild(scale.getHtml());
    container.appendChild(toggle);
    console.log(container);
  };
}

export default View;
