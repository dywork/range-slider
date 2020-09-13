import { Slider } from '../slider/Slider';
import ISliderOptions from '../slider/ISliderOptions';
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

  currentValueInput: HTMLInputElement | null;

  minCurrentValueInput: HTMLInputElement | null;

  maxCurrentValueInput: HTMLInputElement | null;

  stepInput: HTMLInputElement;

  minRangeInput: HTMLInputElement;

  maxRangeInput: HTMLInputElement;

  isRange: boolean;

  isThumbCheckbox: HTMLInputElement;

  isRulerCheckbox: HTMLInputElement;

  isDiapasonCheckbox: HTMLInputElement;

  isVerticalCheckbox: HTMLInputElement;

  constructor(domParent: HTMLElement, slider: Slider) {
    this.domParent = domParent;
    this.slider = slider;
    const { currentValue } = this.slider.getSliderOptions();
    if (currentValue instanceof Array) {
      this.isRange = true;
    } else {
      this.isRange = false;
    }
    slider.subscribe('sliderOptionsUpdate', (sliderOptions: ISliderOptions) => {
      if (sliderOptions.currentValue instanceof Array) {
        this.minCurrentValueInput.value = `${sliderOptions.currentValue[0]}`;
        this.maxCurrentValueInput.value = `${sliderOptions.currentValue[1]}`;
      } else {
        this.currentValueInput.value = `${sliderOptions.currentValue}`;
      }
    });
  }

  init = () => {
    this.mountPanel();
    this.saveDom();
    this.setListeners();
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
    if (this.isRange) {
      this.minCurrentValueInput = this.domParent.querySelector('.current-min-value');
      this.maxCurrentValueInput = this.domParent.querySelector('.current-max-value');
    } else {
      this.currentValueInput = this.domParent.querySelector('.current-value');
    }
    this.stepInput = this.domParent.querySelector('.step');
    this.minRangeInput = this.domParent.querySelector('.min-range-value');
    this.maxRangeInput = this.domParent.querySelector('.max-range-value');
    this.isThumbCheckbox = this.domParent.querySelector('.is-thumb-show');
    this.isRulerCheckbox = this.domParent.querySelector('.is-ruler-show');
    this.isDiapasonCheckbox = this.domParent.querySelector('.is-diapason');
    this.isVerticalCheckbox = this.domParent.querySelector('.is-vertical');
  };

  private setListeners = () => {
    const debounceInput = debounce(() => {
      const newOptions = { ...this.slider.getSliderOptions() };
      const newRange = {
        min: parseInt(this.minRangeInput.value),
        max: parseInt(this.maxRangeInput.value),
      };
      if (newOptions.currentValue instanceof Array) {
        const minValue = parseInt(this.minCurrentValueInput.value);
        const maxValue = parseInt(this.maxCurrentValueInput.value);
        newOptions.currentValue = [minValue, maxValue];
      } else {
        newOptions.currentValue = parseInt(this.currentValueInput.value);
      }
      newOptions.step = parseInt(this.stepInput.value);
      newOptions.range = newRange;
      this.slider.onChangeSliderOptions(newOptions);
    });

    if (this.isRange) {
      this.minCurrentValueInput.addEventListener('input', debounceInput);
      this.maxCurrentValueInput.addEventListener('input', debounceInput);
    } else {
      this.currentValueInput.addEventListener('input', debounceInput);
    }

    this.stepInput.addEventListener('input', debounceInput);
    this.minRangeInput.addEventListener('input', debounceInput);
    this.maxRangeInput.addEventListener('input', debounceInput);

    this.isThumbCheckbox.addEventListener('change', (evt: Event) => {
      const newOptions = { ...this.slider.getSliderOptions() };
      newOptions.isThumb = (<HTMLInputElement>evt.target).checked;
      this.slider.onChangeSliderOptions(newOptions);
    });

    this.isRulerCheckbox.addEventListener('change', (evt: Event) => {
      const newOptions = { ...this.slider.getSliderOptions() };
      newOptions.isRuler = (<HTMLInputElement>evt.target).checked;
      this.slider.onChangeSliderOptions(newOptions);
    });
  };
}

export default ConfigPanel;
