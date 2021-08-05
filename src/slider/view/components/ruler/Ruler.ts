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
    const templateOptions = { sliderClassNames, items: this.getRulerItems() };
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
      this.redraw();
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
    const { range, step } = this.props;
    const midQuantity = Math.ceil((range.max - range.min) / step);
    const viewStep = Math.ceil(midQuantity / 5) * step;
    const midArr = [];
    let value = range.min;

    for (let i = 0; value < range.max; i += 1) {
      value += viewStep;
      if (value < range.max) midArr.push(Number(value.toLocaleString('en', { useGrouping: false })));
    }

    return [range.min, ...midArr, range.max];
  };

  private redraw = () => {
    this.domNode.ruler.textContent = '';
    Array.from(this.getHtml().childNodes).forEach((item) => {
      this.domNode.ruler.appendChild(item);
    });
  };

  private getRulerItems = () => {
    const rulerValues = this.getRulerValues();
    return rulerValues.map((value) => {
      const rulerItem = {
        value,
        style: this.getTransformStyleByValue(value),
        class: sliderClassNames.rulerItem,
      };
      return rulerItem;
    });
  };

  private getTransformStyleByValue = (value: number) => {
    const { isVertical } = this.props;
    const position = this.getPositionByValue(value);

    if (isVertical) {
      return `transform: translate(0px, ${position}%);`;
    }

    return `transform: translate(${position}%, 0px);`;
  };

  private getPositionByValue(value: number): number {
    const { range } = this.props;
    return ((+value - range.min) / (range.max - range.min)) * 1000;
  }
}

export default Ruler;
