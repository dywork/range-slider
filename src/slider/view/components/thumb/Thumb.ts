import sliderClassNames from '../../utils/sliderClassNames';
import Observer from '../../../observer/Observer';
import IThumbProps from '../../../interfaces/view/components/thumb/IThumbProps';
import IDomNode from '../../../interfaces/view/components/thumb/IDomNode';

const thumbTemplate = require('./template.hbs');

class Thumb extends Observer {
  private props: IThumbProps;

  private domNode: IDomNode;

  constructor(props: IThumbProps) {
    super();
    this.props = props;
  }

  getHtml = () => {
    const { value } = this.props;
    const templateOptions = { sliderClassNames, value };
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
    const { value, withThumb } = this.props;

    if (withThumb) {
      this.domNode.thumb.textContent = `${value}`;
    } else {
      this.notify('onThumbHide', '');
    }
  };
}

export default Thumb;
