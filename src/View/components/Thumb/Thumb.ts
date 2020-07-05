import sliderClassName from '../../sliderClassName';

const thumbTemplate = require('./template.hbs');

class Thumb {
  private value: number | number[];

  constructor(value: number | number[]) {
    this.value = value;
  }

  getHtml = () => {
    const templateOptions = { sliderClassName, value: this.value };
    const thumb = document.createElement('div');
    thumb.innerHTML = thumbTemplate(templateOptions);
    return thumb.firstChild;
  };
}

export default Thumb;
