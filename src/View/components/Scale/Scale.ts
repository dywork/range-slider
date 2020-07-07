import sliderClassName from '../../utils/sliderClassName';

const scaleTemplate = require('./template.hbs');

interface IScaleProps {
  currentValue: number | number[];
  range: { min: number; max: number };
  isVertical: boolean;
}

interface IDomNode {
  bar: HTMLElement;
  scale: HTMLElement;
}

class Scale {
  private props: IScaleProps;

  private domNode: IDomNode;

  constructor(props: IScaleProps) {
    this.props = props;
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
    const { range } = this.props;
    const scalePosition = (+currentValue - range.min) / (range.max - range.min);
    return scalePosition;
  };

  getDomNode = () => this.domNode;

  setDomNode = (domNode: IDomNode) => {
    this.domNode = domNode;
  };

  private getTransformStyle = () => {
    const { currentValue, isVertical } = this.props;
    let scalePositions = [];

    if (currentValue instanceof Array) {
      scalePositions = currentValue.map((value: number) => this.getPosition(value));
      const translateScale = scalePositions[0] * 100;
      const totalPosition = scalePositions[1] - translateScale * 0.01;

      if (isVertical) {
        return `transform: translate(0px, ${translateScale}%) scale(1, ${totalPosition});`;
      }

      return `transform: translate(${translateScale}%, 0px) scale(${totalPosition}, 1);`;
    }

    const totalPosition = this.getPosition(currentValue);

    if (isVertical) {
      return `transform: scale(1, ${totalPosition});`;
    }

    return `transform: scale(${totalPosition}, 1);`;
  };
}

export { Scale, IScaleProps };
