import IViewOptions from './IViewOptions';
import { IModelOptions } from '../Model/Model';

class DoubleToggle {
  private viewOptions: IViewOptions;

  private modelOptions: IModelOptions;

  constructor(viewOptions: IViewOptions, modelOptions: IModelOptions) {
    this.viewOptions = viewOptions;
    this.modelOptions = modelOptions;
  }

  render = () => {
    const hello = document.createElement('h1');
    hello.textContent = 'Привет, мир!';
    document.body.appendChild(hello);
  };
}

export default DoubleToggle;
