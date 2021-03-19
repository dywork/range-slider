import sliderClassNames from '../../utils/sliderClassNames';
import IToggleProps from '../../../interfaces/view/components/toggle/IToggleProps';
import IDomNode from '../../../interfaces/view/components/toggle/IDomNode';

const toggleTemplate = require('./template.hbs');

class Toggle {
  private props: IToggleProps;

  private domNode: IDomNode;

  constructor(props: IToggleProps) {
    this.props = props;
  }

  getHtml = () => {
    const templateOptions = { sliderClassNames };
    const toggle = document.createElement('div');
    toggle.innerHTML = toggleTemplate(templateOptions);
    const viewToggle = toggle.querySelector(`.${sliderClassNames.toggle}`);
    viewToggle.setAttribute('style', this._getTransformStyle());
    return toggle.firstChild;
  };

  getDomNode = () => this.domNode;

  setDomNode = (domNode: IDomNode) => {
    this.domNode = domNode;
  };

  updateProps = (props: IToggleProps) => {
    this.props = props;
    this._redraw();
  };

  private _redraw = () => {
    this.domNode.toggle.setAttribute('style', this._getTransformStyle());
  };

  private _getTransformStyle = () => {
    const { isVertical } = this.props;
    const togglePosition = this._getPosition();

    if (isVertical) {
      return `transform: translate(0px, ${togglePosition}%);`;
    }

    return `transform: translate(${togglePosition}%, 0px);`;
  };

  private _getPosition = () => {
    const { scalePosition } = this.props;
    const togglePosition = scalePosition * 1000;
    return togglePosition;
  };
}

export default Toggle;
