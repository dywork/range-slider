import sliderClassName from '../../sliderClassName';

const toggleTemplate = require('./template.hbs');

class Toggle {
  private scalePosition: number;

  private isVertical: boolean;

  constructor(scalePosition: number, isVertical: boolean) {
    this.scalePosition = scalePosition;
    this.isVertical = isVertical;
  }

  getHtml = () => {
    const templateOptions = { sliderClassName };
    const toggle = document.createElement('div');
    toggle.innerHTML = toggleTemplate(templateOptions);
    const viewToggle = toggle.querySelector(`.${sliderClassName.toggle}`);
    viewToggle.setAttribute('style', this.getTransformStyle());
    return toggle.firstChild;
  };

  private getTransformStyle = () => {
    const togglePosition = this.getPosition();

    if (this.isVertical) {
      return `transform: translate(0px, ${togglePosition}%);`;
    }

    return `transform: translate(${togglePosition}%, 0px);`;
  };

  private getPosition = () => {
    const togglePosition = this.scalePosition * 1000;
    return togglePosition;
  };
}

export default Toggle;
