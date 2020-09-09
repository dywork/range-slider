import { Slider } from '../slider/Slider';
const configPanelTemplate = require('./template/configPanel.hbs');

const debounce = (callback: Function) => {
  let timeout: number;

  return (argument: any) => {
    clearTimeout(timeout);
    timeout = setTimeout(callback, 500, argument);
  };
};

class ConfigPanel {
  domParent: HTMLElement;

  slider: Slider;

  currentValueInput: HTMLInputElement;

  stepInput: HTMLInputElement;

  minRangeInput: HTMLInputElement;

  maxRangeInput: HTMLInputElement;

  isThumbCheckbox: HTMLInputElement;

  isRulerCheckbox: HTMLInputElement;

  isDiapasonCheckbox: HTMLInputElement;

  isVerticalCheckbox: HTMLInputElement;

  constructor(domParent: HTMLElement, slider: Slider) {
    this.domParent = domParent;
    this.slider = slider;
  }

  init = () => {
    this.mountPanel();
    this.saveDom();
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

  private saveDom = () => {
    this.currentValueInput = this.domParent.querySelector('#currentValue');
    this.stepInput = this.domParent.querySelector('#step');
    this.minRangeInput = this.domParent.querySelector('#step');
    this.maxRangeInput = this.domParent.querySelector('#step');
    this.isThumbCheckbox = this.domParent.querySelector('#isThumbShow');
    this.isRulerCheckbox = this.domParent.querySelector('#isRulerShow');
    this.isDiapasonCheckbox = this.domParent.querySelector('#isDiapason');
    this.isVerticalCheckbox = this.domParent.querySelector('#isVertical');
  };
}

export default ConfigPanel;
