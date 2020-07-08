import sliderClassName from '../../utils/sliderClassName';

const toggleTemplate = require('./template.hbs');

interface IToggleProps {
  scalePosition: number;
  isVertical: boolean;
}

interface IDomNode {
  toggle: HTMLElement;
  handle: HTMLElement;
}

class Toggle {
  private props: IToggleProps;

  private domNode: IDomNode;

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

  getDomNode = () => this.domNode;

  setDomNode = (domNode: IDomNode) => {
    this.domNode = domNode;
  };

  updateProps = (props: IToggleProps) => {
    this.props = props;
    this.redraw();
  };

  private redraw = () => {
    this.domNode.toggle.setAttribute('style', this.getTransformStyle());
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
