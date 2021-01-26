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

  valuesContainer: HTMLElement;

  currentValueContainer: HTMLElement;

  minCurrentValueContainer: HTMLElement;

  maxCurrentValueContainer: HTMLElement;

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
    this.isRange = this._hasRange();
    slider.subscribe('sliderOptionsUpdate', this._onSliderOptionsUpdate);
  }

  init = () => {
    this._mountPanel();
    this._saveDom();
    this._setListeners();
  };

  private _mountPanel = () => {
    this.domParent.appendChild(this._getPanelContainer());
  };

  private _getPanelContainer = () => {
    const configPanelContainer = document.createElement('div');
    const {
      currentValue,
      range,
      isRuler,
      isThumb,
      step,
      orientation,
    } = this.slider.getSliderOptions();
    const configPanelOptions = {
      currentValue,
      range,
      isRuler,
      isThumb,
      step,
      isVertical: orientation === 'vertical',
      isDiapason: Array.isArray(currentValue),
    };
    configPanelContainer.innerHTML = configPanelTemplate(configPanelOptions);
    return configPanelContainer;
  };

  private _saveDom = () => {
    if (this.isRange) {
      this.minCurrentValueContainer = this.domParent.querySelector(
        '.config-panel__value_current-min-value'
      );
      this.maxCurrentValueContainer = this.domParent.querySelector(
        '.config-panel__value_current-max-value'
      );
      this.minCurrentValueInput = this.domParent.querySelector('.current-min-value');
      this.maxCurrentValueInput = this.domParent.querySelector('.current-max-value');
    } else {
      this.currentValueContainer = this.domParent.querySelector(
        '.config-panel__value_current-value'
      );
      this.currentValueInput = this.domParent.querySelector('.current-value');
    }
    this.valuesContainer = this.domParent.querySelector('.config-panel__values');
    this.stepInput = this.domParent.querySelector('.step');
    this.minRangeInput = this.domParent.querySelector('.min-range-value');
    this.maxRangeInput = this.domParent.querySelector('.max-range-value');
    this.isThumbCheckbox = this.domParent.querySelector('.is-thumb-show');
    this.isRulerCheckbox = this.domParent.querySelector('.is-ruler-show');
    this.isDiapasonCheckbox = this.domParent.querySelector('.is-diapason');
    this.isVerticalCheckbox = this.domParent.querySelector('.is-vertical');
  };

  private _setListeners = () => {
    if (this.isRange) {
      this.minCurrentValueInput.addEventListener('input', this._debounceInput);
      this.maxCurrentValueInput.addEventListener('input', this._debounceInput);
    } else {
      this.currentValueInput.addEventListener('input', this._debounceInput);
    }

    this.stepInput.addEventListener('input', this._debounceInput);
    this.minRangeInput.addEventListener('input', this._debounceInput);
    this.maxRangeInput.addEventListener('input', this._debounceInput);

    this.isThumbCheckbox.addEventListener('change', (evt: Event) => {
      const newOptions = { ...this.slider.getSliderOptions() };
      newOptions.isThumb = (<HTMLInputElement>evt.target).checked;
      this.slider.updateSliderOptions(newOptions);
    });

    this.isRulerCheckbox.addEventListener('change', (evt: Event) => {
      const newOptions = { ...this.slider.getSliderOptions() };
      newOptions.isRuler = (<HTMLInputElement>evt.target).checked;
      this.slider.updateSliderOptions(newOptions);
    });

    this.isDiapasonCheckbox.addEventListener('change', (evt: Event) => {
      const newOptions = { ...this.slider.getSliderOptions() };
      const newIsRange = (<HTMLInputElement>evt.target).checked;

      if (this.isRange && !newIsRange) {
        const currentValue = newOptions.currentValue as number[];
        const newCurrentValue = currentValue[0];
        newOptions.currentValue = newCurrentValue;
        this.isRange = !this.isRange;
        this._toggleValueInputs(newCurrentValue);
      } else if (!this.isRange && newIsRange) {
        const { currentValue, range } = newOptions;
        const minCurrentValue = currentValue as number;
        const maxCurrentValue = range.max;
        const newCurrentValue = [minCurrentValue, maxCurrentValue];
        newOptions.currentValue = newCurrentValue;
        this.isRange = !this.isRange;
        this._toggleValueInputs(newCurrentValue);
      }

      // console.log(newOptions.currentValue);
      this.slider.updateSliderOptions(newOptions);
    });

    this.isVerticalCheckbox.addEventListener('change', (evt: Event) => {
      const newOptions = { ...this.slider.getSliderOptions() };
      const newIsVertical = (<HTMLInputElement>evt.target).checked;
      newOptions.orientation = newIsVertical ? 'vertical' : 'horizontal';
      this._toggleOrientation();
      this.slider.updateSliderOptions(newOptions);
    });
  };

  private _debounceInput = debounce(() => {
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
    this.slider.updateSliderOptions(newOptions);
  });

  private _hasRange = () => {
    const { currentValue } = this.slider.getSliderOptions();
    return currentValue instanceof Array;
  };

  private _onSliderOptionsUpdate = (sliderOptions: ISliderOptions) => {
    this.stepInput.value = `${sliderOptions.step}`;
    this.minRangeInput.value = `${sliderOptions.range.min}`;
    this.maxRangeInput.value = `${sliderOptions.range.max}`;
    if (sliderOptions.currentValue instanceof Array) {
      this.minCurrentValueInput.value = `${sliderOptions.currentValue[0]}`;
      this.maxCurrentValueInput.value = `${sliderOptions.currentValue[1]}`;
    } else {
      this.currentValueInput.value = `${sliderOptions.currentValue}`;
    }
  };

  private _toggleValueInputs = (currentValue: number | number[]) => {
    if (currentValue instanceof Array) {
      this.valuesContainer.removeChild(this.currentValueContainer);

      const maxValueContainer = document.createElement('p');
      this.maxCurrentValueContainer = maxValueContainer;
      maxValueContainer.classList.add('config-panel__value');
      maxValueContainer.classList.add('config-panel__value_current-max-value');
      const maxValueLabel = document.createElement('label');
      maxValueLabel.classList.add('config-panel__label');
      maxValueLabel.textContent = 'Текущее макс. значение:';
      const maxValueInput = document.createElement('input');
      this.maxCurrentValueInput = maxValueInput;
      this.maxCurrentValueInput.classList.add('current-max-value');
      this.maxCurrentValueInput.type = 'number';
      this.maxCurrentValueInput.value = `${currentValue[1]}`;
      this.maxCurrentValueInput.addEventListener('input', this._debounceInput);
      maxValueLabel.appendChild(this.maxCurrentValueInput);
      maxValueContainer.appendChild(maxValueLabel);
      this.valuesContainer.insertAdjacentElement('afterbegin', maxValueContainer);

      const minValueContainer = document.createElement('p');
      this.minCurrentValueContainer = minValueContainer;
      minValueContainer.classList.add('config-panel__value');
      minValueContainer.classList.add('config-panel__value_current-min-value');
      const minValueLabel = document.createElement('label');
      minValueLabel.classList.add('config-panel__label');
      minValueLabel.textContent = 'Текущее мин. значение:';
      const minValueInput = document.createElement('input');
      this.minCurrentValueInput = minValueInput;
      this.minCurrentValueInput.classList.add('current-min-value');
      this.minCurrentValueInput.type = 'number';
      this.minCurrentValueInput.value = `${currentValue[0]}`;
      this.minCurrentValueInput.addEventListener('input', this._debounceInput);
      minValueLabel.appendChild(this.minCurrentValueInput);
      minValueContainer.appendChild(minValueLabel);
      this.valuesContainer.insertAdjacentElement('afterbegin', minValueContainer);
    } else {
      this.valuesContainer.removeChild(this.minCurrentValueContainer);
      this.valuesContainer.removeChild(this.maxCurrentValueContainer);

      const currentValueContainer = document.createElement('p');
      this.currentValueContainer = currentValueContainer;
      this.currentValueContainer.classList.add('config-panel__value');
      this.currentValueContainer.classList.add('config-panel__value_current-value');
      const currentValueLabel = document.createElement('label');
      currentValueLabel.classList.add('config-panel__label');
      currentValueLabel.textContent = 'Текущее значение:';
      const currentValueInput = document.createElement('input');
      this.currentValueInput = currentValueInput;
      this.currentValueInput.classList.add('current-max-value');
      this.currentValueInput.type = 'number';
      this.currentValueInput.value = `${currentValue}`;
      this.currentValueInput.addEventListener('input', this._debounceInput);
      currentValueLabel.appendChild(this.currentValueInput);
      currentValueContainer.appendChild(currentValueLabel);
      this.valuesContainer.insertAdjacentElement('afterbegin', currentValueContainer);
    }
  };

  private _toggleOrientation = () => {
    const sliderParent = this.slider.getSliderOptions().domParent;
    const sliderWrap = sliderParent.querySelector('.range-slider__wrap');
    sliderParent.classList.toggle('config-panel__slider_vertical');
    sliderWrap.classList.toggle('config-panel__slider_vertical');
  };
}

export default ConfigPanel;
