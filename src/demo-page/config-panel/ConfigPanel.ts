import configPanelClassName from './utils/configPanelClassName';
import Slider from '../../slider/Slider';
import IModelOptions from '../../slider/interfaces/IModelOptions';

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
      withRuler,
      isThumb,
      step,
      orientation,
    } = this.slider.getModelOptions();
    const configPanelOptions = {
      currentValues,
      range,
      withRuler,
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
    const nameOptions = target.getAttribute('data-value-name') as 'withRuler' | 'isThumb';
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
    const {
      currentValueContainer,
      maxCurrentValueContainer,
      maxCurrentValueInput,
      minCurrentValueContainer,
      minCurrentValueInput,
    } = configPanelClassName;

    if (currentValue instanceof Array) {
      this.valuesContainer.removeChild(this.currentValueContainer);

      this.maxCurrentValueContainer = this._getInputValueContainer({
        containerClassName: maxCurrentValueContainer,
        labelText: 'Текущее макс. значение:',
        valueInputClassName: maxCurrentValueInput,
        currentValue: currentValue[1],
      });

      this.maxCurrentValueInput = this.maxCurrentValueContainer.querySelector(`.${maxCurrentValueInput}`);

      this.minCurrentValueContainer = this._getInputValueContainer({
        containerClassName: minCurrentValueContainer,
        labelText: 'Текущее мин. значение:',
        valueInputClassName: minCurrentValueInput,
        currentValue: currentValue[0],
      });

      this.minCurrentValueInput = this.minCurrentValueContainer.querySelector(`.${minCurrentValueInput}`);

      this.valuesContainer.insertAdjacentElement('afterbegin', this.maxCurrentValueContainer);
      this.valuesContainer.insertAdjacentElement('afterbegin', this.minCurrentValueContainer);
    } else {
      this.valuesContainer.removeChild(this.minCurrentValueContainer);
      this.valuesContainer.removeChild(this.maxCurrentValueContainer);

      this.currentValueContainer = this._getInputValueContainer({
        containerClassName: currentValueContainer,
        labelText: 'Текущее значение:',
        valueInputClassName: maxCurrentValueInput,
        currentValue: currentValue as number,
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
    this.isDiapason = this._hasDiapason();
    const {
      currentValues, step, range, withRuler, isThumb,
    } = this.slider.getModelOptions();

    this.stepInput.value = `${step}`;
    this.minRangeInput.value = `${range.min}`;
    this.maxRangeInput.value = `${range.max}`;
    this.rulerCheckbox.checked = withRuler;
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
