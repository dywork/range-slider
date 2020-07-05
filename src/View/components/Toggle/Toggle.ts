import sliderClassName from '../../sliderClassName';

const toggleTemplate = require('./template.hbs');

class Toggle {
  private isThumb: boolean;

  constructor(isThumb: boolean) {
    this.isThumb = isThumb;
  }

  getToggle = () => {
    const templateOptions = { sliderClassName, isThumb: this.isThumb };
    return toggleTemplate(templateOptions);
  };
}

export default Toggle;
