import Observer from '../../../Observer/Observer';
import sliderClassName from '../../utils/sliderClassName';

const thumbTemplate = require('./template.hbs');

interface IThumbProps {
  value: number | number[];
  isThumb: boolean;
}

interface IDomNode {
  thumb: HTMLElement;
}

class Thumb extends Observer {
  private props: IThumbProps;

  private domNode: IDomNode;

  constructor(props: IThumbProps) {
    super();
    this.props = props;
  }

  getHtml = () => {
    const { value } = this.props;
    const templateOptions = { sliderClassName, value };
    const thumb = document.createElement('div');
    thumb.innerHTML = thumbTemplate(templateOptions);
    return thumb.firstChild;
  };

  getDomNode = () => this.domNode;

  setDomNode = (domNode: IDomNode) => {
    this.domNode = domNode;
  };

  destroyDom = () => {
    const { thumb } = this.domNode;
    const parent = thumb.parentElement;
    parent.removeChild(thumb);
  };

  updateProps = (props: IThumbProps) => {
    this.props = props;
    this._redraw();
  };

  private _redraw = () => {
    const { value, isThumb } = this.props;

    if (isThumb) {
      this.domNode.thumb.textContent = `${value}`;
    } else {
      this.notify('onThumbHide', '');
    }
  };
}

export { Thumb, IThumbProps };
