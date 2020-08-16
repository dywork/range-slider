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
    this.mountPanel();
  };

  private mountPanel = () => {
    this.domParent.appendChild(this.getPanelContainer());
  };

  private getPanelContainer = () => {
    const configPanelContainer = document.createElement('div');
    const {
      currentValue,
      range,
      isRuler,
      isThumb,
      step,
      decimal,
      orientation,
    } = this.slider.getSliderOptions();
    const configPanelOptions = {
      currentValue,
      range,
      isRuler,
      isThumb,
      step,
      decimal,
      isVertical: orientation === 'vertical',
      isDiapason: Array.isArray(currentValue),
    };
    configPanelContainer.innerHTML = configPanelTemplate(configPanelOptions);
    return configPanelContainer;
  };
}

export default ConfigPanel;
