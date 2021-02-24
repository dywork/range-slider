import sliderClassName from '../../utils/sliderClassName';
import IScaleProps from '../../../interfaces/view/components/scale/IScaleProps';
import IDomNode from '../../../interfaces/view/components/scale/IDomNode';

const scaleTemplate = require('./template.hbs');

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
    scaleView.setAttribute('style', this._getTransformStyle());
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

  updateProps = (props: IScaleProps) => {
    this.props = props;
    this._redraw();
  };

  private _redraw = () => {
    this.domNode.scale.setAttribute('style', this._getTransformStyle());
  };

  private _getTransformStyle = () => {
    const { currentValues, isVertical } = this.props;
    const isDiapason = currentValues.length === 2;

    if (isDiapason) {
      const scalePositions = currentValues.map((value: number) => this.getPosition(value));
      const translateScale = scalePositions[0] * 100;
      const totalPosition = scalePositions[1] - translateScale * 0.01;

      if (isVertical) {
        return `transform: translate(0px, ${translateScale}%) scale(1, ${totalPosition});`;
      }

      return `transform: translate(${translateScale}%, 0px) scale(${totalPosition}, 1);`;
    }

    const totalPosition = this.getPosition(currentValues[0]);

    if (isVertical) {
      return `transform: scale(1, ${totalPosition});`;
    }

    return `transform: scale(${totalPosition}, 1);`;
  };
}

export default Scale;