import sliderClassName from '../../utils/sliderClassName';

const thumbTemplate = require('./template.hbs');

interface IDomNode {
  thumb: Element;
}

class Thumb {
  private value: number | number[];

  private domNode: IDomNode;

  constructor(value: number | number[]) {
    this.value = value;
  }

  getHtml = () => {
    const templateOptions = { sliderClassName, value: this.value };
    const thumb = document.createElement('div');
    thumb.innerHTML = thumbTemplate(templateOptions);
    return thumb.firstChild;
  };

  getDomNode = () => this.domNode;

  setDomNode = (domNode: IDomNode) => {
    this.domNode = domNode;
  };
}

export default Thumb;
