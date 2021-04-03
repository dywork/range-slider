import sliderClassNames from '../../utils/sliderClassNames';
import Observer from '../../../observer/Observer';
import IRulerProps from '../../../interfaces/view/components/ruler/IRulerProps';
import IDomNode from '../../../interfaces/view/components/ruler/IDomNode';

const rulerTemplate = require('./template.hbs');

class Ruler extends Observer {
  private props: IRulerProps;

  private domNode: IDomNode;

  constructor(props: IRulerProps) {
    super();
    this.props = props;
  }

  getProps = () => this.props;

  getHtml = () => {
    const templateOptions = { sliderClassNames, items: this._getRulerItems() };
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
    if (this.props.withRuler) {
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

  getRulerValues = () => {
    const {
      range, step, maxDecimalPlace, rulerStep,
    } = this.props;
    const viewStep = rulerStep || step;
    const midArr = [];
    const midQuantity = Math.floor((range.max - range.min) / viewStep);

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < midQuantity; i++) {
      const value = (i + 1) * viewStep + range.min;
      midArr.push(+value.toFixed(maxDecimalPlace));
    }

    return [range.min, ...midArr, range.max];
  };

  private _redraw = () => {
    this.domNode.ruler.textContent = '';
    Array.from(this.getHtml().childNodes).forEach((item) => {
      this.domNode.ruler.appendChild(item);
    });
  };

  private _getRulerItems = () => {
    const rulerValues = this.getRulerValues();
    return rulerValues.map((value) => {
      const rulerItem = {
        value,
        style: this._getTransformStyleByValue(value),
        class: sliderClassNames.rulerItem,
      };
      return rulerItem;
    });
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

export default Ruler;
