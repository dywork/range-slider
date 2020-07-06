import { IModelOptions } from '../../../Model/Model';
import sliderClassName from '../../utils/sliderClassName';

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

  getPosition = (currentValue: number) => {
    const { range } = this.modelOptions;
    const scalePosition = (+currentValue - range.min) / (range.max - range.min);
    return scalePosition;
  };

  private getTransformStyle = () => {
    const { currentValue } = this.modelOptions;
    let scalePositions = [];

    if (currentValue instanceof Array) {
      scalePositions = currentValue.map((value: number) => this.getPosition(value));
      const translateScale = scalePositions[0] * 100;
      const totalPosition = scalePositions[1] - translateScale * 0.01;

      if (this.isVertical) {
        return `transform: translate(0px, ${translateScale}%) scale(1, ${totalPosition});`;
      }

      return `transform: translate(${translateScale}%, 0px) scale(${totalPosition}, 1);`;
    }

    const totalPosition = this.getPosition(currentValue);

    if (this.isVertical) {
      return `transform: scale(1, ${totalPosition});`;
    }

    return `transform: scale(${totalPosition}, 1);`;
  };
}

export default Scale;
