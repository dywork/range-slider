import sliderClassName from '../../sliderClassName';

const toggleTemplate = require('./template.hbs');

class Toggle {
  getHtml = () => {
    const templateOptions = { sliderClassName };
    const toggle = document.createElement('div');
    toggle.innerHTML = toggleTemplate(templateOptions);
    return toggle.firstChild;
  };
}

export default Toggle;
