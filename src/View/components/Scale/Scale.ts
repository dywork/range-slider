import { IModelOptions } from '../../../Model/Model';
import sliderClassName from '../../sliderClassName';

const scaleTemplate = require('./template.hbs');

class Scale {
  private modelOptions: IModelOptions;

  private isVertical: boolean;

  constructor(modelOptions: IModelOptions, isVertical: boolean) {
    this.modelOptions = modelOptions;
    this.isVertical = isVertical;
  }

  getHtml = () => {
    const templateOptions = { sliderClassName };
    const scale = document.createElement('div');
    scale.innerHTML = scaleTemplate(templateOptions);
    const scaleView = scale.querySelector(`.${sliderClassName.scale}`);
    scaleView.setAttribute('style', this.getTransformStyle());
    return scale.firstChild;
  };

  getPosition = () => {
    const { currentValue, range } = this.modelOptions;
    const scalePosition = (+currentValue - range.min) / (range.max - range.min);
    return scalePosition;
  };

  private getTransformStyle = () => {
    const scalePosition = this.getPosition();

    if (this.isVertical) {
      return `transform: scale(1, ${scalePosition});`;
    }

    return `transform: scale(${scalePosition}, 1);`;
  };
}

export default Scale;
