import configPanelClassName from './utils/configPanelClassName';
import Slider from '../../slider/Slider';
import IModelOptions from '../../slider/interfaces/IModelOptions';
import CurrentValues from '../../slider/interfaces/types';

const has = require('has');

interface IOptionsValueContainer {
  containerClassName: string;
  labelText: string;
  valueInputClassName: string;
  currentValue: number;
}

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

  maxDecimalPlaceInput: HTMLInputElement;

  isRange: boolean;

  withFractional: boolean;

  thumbCheckbox: HTMLInputElement;

  rulerCheckbox: HTMLInputElement;

  diapasonCheckbox: HTMLInputElement;

  verticalCheckbox: HTMLInputElement;

  constructor(domParent: HTMLElement, slider: Slider) {
    this.slider = slider;
    this.domParent = domParent;
    this.isRange = this._hasRange();
    this.withFractional = this._hasFractional();
  }

  init = () => {
    this._mountPanel();
    this._saveDom();
    this._setListeners();
    this.slider.subscribe('modelOptionsUpdate', this._onOptionsUpdate);
  };

  private _mountPanel = () => {
    this.domParent.appendChild(this._getPanelContainer());
  };

  private _getPanelContainer = () => {
    const configPanelContainer = document.createElement('div');
    const {
      currentValues,
      range,
      withRuler,
      withThumb,
      step,
      orientation,
      maxDecimalPlace,
    } = this.slider.getModelOptions();
    const configPanelOptions = {
      currentValues,
      range,
      withRuler,
      withThumb,
      step,
      isVertical: orientation === 'vertical',
      isRange: this._hasRange(),
      withFractional: this.withFractional,
      maxDecimalPlace,
    };
    configPanelContainer.innerHTML = configPanelTemplate(configPanelOptions);
    return configPanelContainer;
  };

  private _hasRange = () => {
    const { currentValues } = this.slider.getModelOptions();
    return has(currentValues, 'max');
  };

  private _hasFractional = () => {
    const rulerNumbers = this.slider.getRulerValues();
    return rulerNumbers.some((num) => !Number.isInteger(num));
  };

  private _saveDom = () => {
    if (this.isRange) {
      this.minCurrentValueContainer = this.domParent.querySelector(
        `.${configPanelClassName.minCurrentValueContainer}`,
      );
      this.maxCurrentValueContainer = this.domParent.querySelector(
        `.${configPanelClassName.maxCurrentValueContainer}`,
      );
      this.minCurrentValueInput = this.domParent.querySelector(
        `.${configPanelClassName.minCurrentValueInput}`,
      );
      this.maxCurrentValueInput = this.domParent.querySelector(
        `.${configPanelClassName.maxCurrentValueInput}`,
      );
    } else {
      this.currentValueContainer = this.domParent.querySelector(
        `.${configPanelClassName.currentValueContainer}`,
      );
      this.currentValueInput = this.domParent.querySelector(
        `.${configPanelClassName.currentValueInput}`,
      );
    }

    this.valuesContainer = this.domParent.querySelector(`.${configPanelClassName.valuesContainer}`);
    this.stepInput = this.domParent.querySelector(`.${configPanelClassName.stepInput}`);
    this.minRangeInput = this.domParent.querySelector(`.${configPanelClassName.minRangeInput}`);
    this.maxRangeInput = this.domParent.querySelector(`.${configPanelClassName.maxRangeInput}`);
    this.maxDecimalPlaceInput = this.domParent.querySelector(
      `.${configPanelClassName.maxDecimalPlaceInput}`,
    );
    this.thumbCheckbox = this.domParent.querySelector(`.${configPanelClassName.thumbCheckbox}`);
    this.rulerCheckbox = this.domParent.querySelector(`.${configPanelClassName.rulerCheckbox}`);
    this.diapasonCheckbox = this.domParent.querySelector(
      `.${configPanelClassName.diapasonCheckbox}`,
    );
    this.verticalCheckbox = this.domParent.querySelector(
      `.${configPanelClassName.verticalCheckbox}`,
    );
  };

  private _setListeners = () => {
    if (this.isRange) {
      this.minCurrentValueInput.addEventListener('input', this._debounceInput);
      this.maxCurrentValueInput.addEventListener('input', this._debounceInput);
    } else {
      this.currentValueInput.addEventListener('input', this._debounceInput);
    }

    if (this.withFractional) {
      this.maxDecimalPlaceInput.addEventListener('input', this._debounceInput);
    }

    this.stepInput.addEventListener('input', this._debounceInput);
    this.minRangeInput.addEventListener('input', this._debounceInput);
    this.maxRangeInput.addEventListener('input', this._debounceInput);

    this.thumbCheckbox.addEventListener('change', this._onCheckboxChange);
    this.rulerCheckbox.addEventListener('change', this._onCheckboxChange);
    this.diapasonCheckbox.addEventListener('change', this._onDiapasonChange);
    this.verticalCheckbox.addEventListener('change', this._onVerticalChange);
  };

  private _debounceInput = debounce(() => {
    const newOptions: IModelOptions = { ...this.slider.getModelOptions() };
    const newRange = {
      min: +this.minRangeInput.value,
      max: +this.maxRangeInput.value,
    };
    newOptions.range = newRange;

    if (this.isRange) {
      const minValue = +this.minCurrentValueInput.value;
      const maxValue = +this.maxCurrentValueInput.value;
      newOptions.currentValues = { min: minValue, max: maxValue };
    } else {
      newOptions.currentValues = { min: +this.currentValueInput.value };
    }

    if (this.withFractional) {
      newOptions.maxDecimalPlace = +this.maxDecimalPlaceInput.value;
    }

    newOptions.step = +this.stepInput.value;
    this.slider.updateOptions(newOptions);
  });

  private _onCheckboxChange = (evt: Event) => {
    const target = <HTMLInputElement>evt.target;
    const nameOptions = target.getAttribute('data-value-name') as 'withRuler' | 'withThumb';
    const newOptions = { ...this.slider.getModelOptions() };
    newOptions[nameOptions] = target.checked;
    this.slider.updateOptions(newOptions);
  };

  private _onDiapasonChange = (evt: Event) => {
    const newOptions = { ...this.slider.getModelOptions() };
    const newIsRange = (<HTMLInputElement>evt.target).checked;
    const { currentValues } = newOptions;

    if (this.isRange && !newIsRange) {
      const newCurrentValue = currentValues.min;
      const newCurrentValues = {
        min: newCurrentValue,
      };
      newOptions.currentValues = newCurrentValues;
      this.isRange = !this.isRange;
      this._toggleValueInputs(newCurrentValues);
    } else if (!this.isRange && newIsRange) {
      const { range } = newOptions;
      const minCurrentValue = currentValues.min;
      const maxCurrentValue = range.max;
      const newCurrentValues = {
        min: minCurrentValue,
        max: maxCurrentValue,
      };
      newOptions.currentValues = newCurrentValues;
      this.isRange = !this.isRange;
      this._toggleValueInputs(newCurrentValues);
    }

    this.slider.updateOptions(newOptions);
  };

  private _onVerticalChange = (evt: Event) => {
    const newOptions = { ...this.slider.getModelOptions() };
    const newIsVertical = (<HTMLInputElement>evt.target).checked;
    newOptions.orientation = newIsVertical ? 'vertical' : 'horizontal';
    this._toggleOrientation();
    this.slider.updateOptions(newOptions);
  };

  private _toggleOrientation = () => {
    const sliderParent = this.slider.getDomParent();
    const sliderWrap = sliderParent.querySelector('.range-slider__wrap');
    sliderParent.classList.toggle('config-panel__slider_vertical');
    sliderWrap.classList.toggle('config-panel__slider_vertical');
  };

  private _toggleValueInputs = (currentValues: CurrentValues) => {
    const {
      currentValueContainer,
      maxCurrentValueContainer,
      maxCurrentValueInput,
      minCurrentValueContainer,
      minCurrentValueInput,
    } = configPanelClassName;

    if (this.isRange) {
      this.valuesContainer.removeChild(this.currentValueContainer);

      this.maxCurrentValueContainer = this._getInputValueContainer({
        containerClassName: maxCurrentValueContainer,
        labelText: 'Текущее макс. значение:',
        valueInputClassName: maxCurrentValueInput,
        currentValue: currentValues.max,
      });

      this.maxCurrentValueInput = this.maxCurrentValueContainer.querySelector(
        `.${maxCurrentValueInput}`,
      );

      this.minCurrentValueContainer = this._getInputValueContainer({
        containerClassName: minCurrentValueContainer,
        labelText: 'Текущее мин. значение:',
        valueInputClassName: minCurrentValueInput,
        currentValue: currentValues.min,
      });

      this.minCurrentValueInput = this.minCurrentValueContainer.querySelector(
        `.${minCurrentValueInput}`,
      );

      this.valuesContainer.insertAdjacentElement('afterbegin', this.maxCurrentValueContainer);
      this.valuesContainer.insertAdjacentElement('afterbegin', this.minCurrentValueContainer);
    } else {
      this.valuesContainer.removeChild(this.minCurrentValueContainer);
      this.valuesContainer.removeChild(this.maxCurrentValueContainer);

      this.currentValueContainer = this._getInputValueContainer({
        containerClassName: currentValueContainer,
        labelText: 'Текущее значение:',
        valueInputClassName: maxCurrentValueInput,
        currentValue: currentValues.min,
      });

      this.currentValueInput = this.currentValueContainer.querySelector(`.${maxCurrentValueInput}`);

      this.valuesContainer.insertAdjacentElement('afterbegin', this.currentValueContainer);
    }
  };

  private _getInputValueContainer = (options: IOptionsValueContainer) => {
    const {
      containerClassName, labelText, valueInputClassName, currentValue,
    } = options;

    const valueContainer = document.createElement('p');
    valueContainer.classList.add(configPanelClassName.valueContainer);
    valueContainer.classList.add(containerClassName);
    const valueLabel = document.createElement('label');
    valueLabel.classList.add(configPanelClassName.valueLabel);
    valueLabel.textContent = labelText;
    const valueInput = document.createElement('input');
    valueInput.classList.add(valueInputClassName);
    valueInput.type = 'number';
    valueInput.value = `${currentValue}`;
    valueInput.addEventListener('input', this._debounceInput);
    valueLabel.appendChild(valueInput);
    valueContainer.appendChild(valueLabel);
    return valueContainer;
  };

  private _onOptionsUpdate = () => {
    this.isRange = this._hasRange();
    const {
      currentValues, step, range, withRuler, withThumb,
    } = this.slider.getModelOptions();

    this.stepInput.value = `${step}`;
    this.minRangeInput.value = `${range.min}`;
    this.maxRangeInput.value = `${range.max}`;
    this.rulerCheckbox.checked = withRuler;
    this.thumbCheckbox.checked = withThumb;

    if (this.isRange) {
      this.minCurrentValueInput.value = `${currentValues.min}`;
      this.maxCurrentValueInput.value = `${currentValues.max}`;
    } else {
      this.currentValueInput.value = `${currentValues.min}`;
    }
  };
}

export default ConfigPanel;
