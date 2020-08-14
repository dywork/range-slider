import { Slider } from '../slider/Slider';
const configPanelTemplate = require('./template/configPanel.hbs');

class ConfigPanel {
  domParent: HTMLElement;

  slider: Slider;

  constructor(domParent: HTMLElement, slider: Slider) {
    this.domParent = domParent;
    this.slider = slider;
  }

  init = () => {
    const configPanelContainer = document.createElement('div');
    configPanelContainer.innerHTML = configPanelTemplate();
    this.domParent.appendChild(configPanelContainer);
    console.log(this.slider.getSliderOptions());
  };
}

export default ConfigPanel;
