import sliderClassName from '../../utils/sliderClassName';

const toggleTemplate = require('./template.hbs');

interface IToggleProps {
  scalePosition: number;
  isVertical: boolean;
}

class Toggle {
  private props: IToggleProps;

  constructor(props: IToggleProps) {
    this.props = props;
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
    const { isVertical } = this.props;
    const togglePosition = this.getPosition();

    if (isVertical) {
      return `transform: translate(0px, ${togglePosition}%);`;
    }

    return `transform: translate(${togglePosition}%, 0px);`;
  };

  private getPosition = () => {
    const { scalePosition } = this.props;
    const togglePosition = scalePosition * 1000;
    return togglePosition;
  };
}

export { Toggle, IToggleProps };
