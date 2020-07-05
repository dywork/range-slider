import sliderClassName from '../../sliderClassName';

const scaleTemplate = require('./template.hbs');

class Scale {
  getHtml = () => {
    const templateOptions = { sliderClassName };
    const scale = document.createElement('div');
    scale.innerHTML = scaleTemplate(templateOptions);
    return scale.firstChild;
  };
}

export default Scale;
