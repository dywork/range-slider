import sliderClassName from '../../utils/sliderClassName';

const rulerTemplate = require('./template.hbs');

interface IRulerProps {
  step: number;
  range: { min: number; max: number };
}

class Ruler {
  private props: IRulerProps;

  constructor(props: IRulerProps) {
    this.props = props;
  }

  getHtml = () => {
    const templateOptions = { sliderClassName, values: this.getRulerValues() };
    const ruler = document.createElement('div');
    ruler.innerHTML = rulerTemplate(templateOptions);
    return ruler.firstChild;
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
}

export { Ruler, IRulerProps };
