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
    const templateOptions = { sliderClassName };
    const ruler = document.createElement('div');
    ruler.innerHTML = rulerTemplate(templateOptions);
    return ruler.firstChild;
  };
}

export { Ruler, IRulerProps };
