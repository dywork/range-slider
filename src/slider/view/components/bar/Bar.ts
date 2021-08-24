import has from 'has';
import sliderClassNames from '../../utils/sliderClassNames';
import IBarProps from '../../../interfaces/view/components/bar/IBarProps';
import IDomNode from '../../../interfaces/view/components/bar/IDomNode';

const scaleTemplate = require('./template.hbs');

class Bar {
  private props: IBarProps;

  private domNode!: IDomNode;

  constructor(props: IBarProps) {
    this.props = props;
  }

  getHtml = (): ChildNode => {
    const templateOptions = { sliderClassNames };
    const scale = document.createElement('div');
    scale.innerHTML = scaleTemplate(templateOptions);
    const scaleView = scale.querySelector(`.${sliderClassNames.scale}`) as HTMLElement;
    scaleView.setAttribute('style', this.getTransformStyle());
    return scale.firstChild as HTMLElement;
  };

  getPosition = (currentValue: number): number => {
    const { range } = this.props;
    const scalePosition = (+currentValue - range.min) / (range.max - range.min);
    return scalePosition;
  };

  getDomNode = () => this.domNode;

  setDomNode = (domNode: IDomNode) => {
    this.domNode = domNode;
  };

  updateProps = (props: IBarProps) => {
    this.props = props;
    this.redraw();
  };

  private redraw = () => {
    this.domNode.scale.setAttribute('style', this.getTransformStyle());
  };

  private getTransformStyle = (): string => {
    const { currentValues, isVertical } = this.props;
    const isRange = has(currentValues, 'max');

    if (isRange) {
      // eslint-disable-next-line max-len
      const scalePositions = Object.entries(currentValues).map(([, value]) => this.getPosition(value!));
      const translateScale = scalePositions[0] * 100;
      const totalPosition = scalePositions[1] - translateScale * 0.01;

      if (isVertical) {
        return `transform: translate(0px, ${translateScale}%) scale(1, ${totalPosition});`;
      }

      return `transform: translate(${translateScale}%, 0px) scale(${totalPosition}, 1);`;
    }

    const totalPosition = this.getPosition(currentValues.min);

    if (isVertical) {
      return `transform: scale(1, ${totalPosition});`;
    }

    return `transform: scale(${totalPosition}, 1);`;
  };
}

export default Bar;
