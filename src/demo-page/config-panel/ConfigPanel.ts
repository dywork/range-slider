import configPanelClassName from './utils/configPanelClassName';
import Slider from '../../slider/Slider';
import IModelOptions from '../../slider/interfaces/IModelOptions';

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

  isDiapason: boolean;

  thumbCheckbox: HTMLInputElement;

  rulerCheckbox: HTMLInputElement;

  diapasonCheckbox: HTMLInputElement;

  verticalCheckbox: HTMLInputElement;

  constructor(domParent: HTMLElement, slider: Slider) {
    this.slider = slider;
    this.domParent = domParent;
    this.isDiapason = this._hasDiapason();
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
      isRuler,
      isThumb,
      step,
      orientation,
    } = this.slider.getModelOptions();
    const configPanelOptions = {
      currentValues,
      range,
      isRuler,
      isThumb,
      step,
      isVertical: orientation === 'vertical',
      isDiapason: currentValues.length === 2,
    };
    configPanelContainer.innerHTML = configPanelTemplate(configPanelOptions);
    return configPanelContainer;
  };

  private _hasDiapason = () => {
    const { currentValues } = this.slider.getModelOptions();
    return currentValues.length === 2;
  };

  private _saveDom = () => {
    if (this.isDiapason) {
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
    if (this.isDiapason) {
      this.minCurrentValueInput.addEventListener('input', this._debounceInput);
      this.maxCurrentValueInput.addEventListener('input', this._debounceInput);
    } else {
      this.currentValueInput.addEventListener('input', this._debounceInput);
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
      min: parseInt(this.minRangeInput.value, 10),
      max: parseInt(this.maxRangeInput.value, 10),
    };
    newOptions.range = newRange;

    if (this.isDiapason) {
      const minValue = parseInt(this.minCurrentValueInput.value, 10);
      const maxValue = parseInt(this.maxCurrentValueInput.value, 10);
      newOptions.currentValues = [minValue, maxValue];
    } else {
      newOptions.currentValues = [parseInt(this.currentValueInput.value, 10)];
    }

    newOptions.step = parseInt(this.stepInput.value, 10);
    this.slider.updateOptions(newOptions);
  });

  private _onCheckboxChange = (evt: Event) => {
    const target = <HTMLInputElement>evt.target;
    const nameOptions = target.getAttribute('data-value-name') as 'isRuler' | 'isThumb';
    const newOptions = { ...this.slider.getModelOptions() };
    newOptions[nameOptions] = target.checked;
    this.slider.updateOptions(newOptions);
  };

  private _onDiapasonChange = (evt: Event) => {
    const newOptions = { ...this.slider.getModelOptions() };
    const newIsRange = (<HTMLInputElement>evt.target).checked;
    const { currentValues } = newOptions;

    if (this.isDiapason && !newIsRange) {
      const newCurrentValue = currentValues[0];
      newOptions.currentValues = [newCurrentValue];
      this.isDiapason = !this.isDiapason;
      this._toggleValueInputs(newCurrentValue);
    } else if (!this.isDiapason && newIsRange) {
      const { range } = newOptions;
      const minCurrentValue = currentValues[0];
      const maxCurrentValue = range.max;
      const newCurrentValues = [minCurrentValue, maxCurrentValue];
      newOptions.currentValues = newCurrentValues;
      this.isDiapason = !this.isDiapason;
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

  private _onOptionsUpdate = () => {
    this.isDiapason = this._hasDiapason();
    const {
      currentValues, step, range, isRuler, isThumb,
    } = this.slider.getModelOptions();

    this.stepInput.value = `${step}`;
    this.minRangeInput.value = `${range.min}`;
    this.maxRangeInput.value = `${range.max}`;
    this.rulerCheckbox.checked = isRuler;
    this.thumbCheckbox.checked = isThumb;

    if (this.isDiapason) {
      this.minCurrentValueInput.value = `${currentValues[0]}`;
      this.maxCurrentValueInput.value = `${currentValues[1]}`;
    } else {
      this.currentValueInput.value = `${currentValues[0]}`;
    }
  };
}

export default ConfigPanel;
