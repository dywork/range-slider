import sliderClassName from '../../utils/sliderClassName';

const rulerTemplate = require('./template.hbs');

interface IRulerProps {
  step: number;
  range: { min: number; max: number };
  isVertical: boolean;
}

class Ruler {
  private props: IRulerProps;

  constructor(props: IRulerProps) {
    this.props = props;
  }

  getHtml = () => {
    const templateOptions = { sliderClassName, items: this.getRulerItems() };
    const ruler = document.createElement('div');
    console.log(this.getRulerItems());
    ruler.innerHTML = rulerTemplate(templateOptions);
    return ruler.firstChild;
  };

  private getRulerItems = () => {
    const rulerValues = this.getRulerValues();
    return rulerValues.map((value) => {
      const rulerItem = { value, style: this.getTransformStyleByValue(value) };
      return rulerItem;
    });
  };

  private getRulerValues = () => {
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

export { Ruler, IRulerProps };
