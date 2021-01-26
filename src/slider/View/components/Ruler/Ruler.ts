import Observer from '../../../Observer/Observer';
import sliderClassName from '../../utils/sliderClassName';

const rulerTemplate = require('./template.hbs');

interface IRulerProps {
  step: number;
  range: { min: number; max: number };
  isRuler: boolean;
  isVertical: boolean;
}

interface IDomNode {
  ruler: HTMLElement;
}

class Ruler extends Observer {
  private props: IRulerProps;

  private domNode: IDomNode;

  constructor(props: IRulerProps) {
    super();
    this.props = props;
  }

  getProps = () => this.props;

  getHtml = () => {
    const templateOptions = { sliderClassName, items: this._getRulerItems() };
    const ruler = document.createElement('div');
    ruler.innerHTML = rulerTemplate(templateOptions);
    return ruler.firstChild;
  };

  getDomNode = () => this.domNode;

  setDomNode = (domNode: IDomNode) => {
    this.domNode = domNode;
  };

  updateProps = (props: IRulerProps) => {
    this.props = props;
    if (this.props.isRuler) {
      this._redraw();
    } else {
      this.notify('onRulerHide', '');
    }
  };

  destroyDom = () => {
    const { ruler } = this.domNode;
    const parent = ruler.parentElement;
    parent.removeChild(ruler);
  };

  private _redraw = () => {
    this.domNode.ruler.textContent = '';
    Array.from(this.getHtml().childNodes).forEach((item) => {
      this.domNode.ruler.appendChild(item);
    });
  };

  private _getRulerItems = () => {
    const rulerValues = this._getRulerValues();
    return rulerValues.map((value) => {
      const rulerItem = {
        value,
        style: this._getTransformStyleByValue(value),
        class: sliderClassName.rulerItem,
      };
      return rulerItem;
    });
  };

  private _getRulerValues = () => {
    const { range, step } = this.props;
    const middArr = [];
    const midQuantity = Math.floor((range.max - range.min) / step);

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < midQuantity; i++) {
      const value = (i + 1) * step + range.min;
      middArr.push(value);
    }

    return [range.min, ...middArr, range.max];
  };

  private _getTransformStyleByValue = (value: number) => {
    const { isVertical } = this.props;
    const position = this._getPositionByValue(value);

    if (isVertical) {
      return `transform: translate(0px, ${position}%);`;
    }

    return `transform: translate(${position}%, 0px);`;
  };

  private _getPositionByValue(value: number): number {
    const { range } = this.props;
    return ((+value - range.min) / (range.max - range.min)) * 1000;
  }
}

export { Ruler, IRulerProps };
