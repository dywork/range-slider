import has from 'has';
import configPanelClassName from './utils/configPanelClassName';
import Slider from '../../slider/Slider';
import IModelOptions from '../../slider/interfaces/IModelOptions';
import CurrentValues from '../../slider/interfaces/types';
import debounce from './utils/debounce';

const configPanelTemplate = require('./template/configPanel.hbs');

type DomElements = {
  valuesContainer: HTMLElement;
  currentValueContainer: HTMLElement;
  currentValueInput: HTMLInputElement;
  maxCurrentValueContainer: HTMLElement;
  maxCurrentValueInput: HTMLInputElement;
  stepInput: HTMLInputElement;
  rulerStepInput: HTMLInputElement;
  rulerStepContainer: HTMLElement;
  minRangeInput: HTMLInputElement;
  maxRangeInput: HTMLInputElement;
  thumbCheckbox: HTMLInputElement;
  maxDecimalPlaceContainer: HTMLElement;
  maxDecimalPlaceInput: HTMLInputElement;
  rulerCheckbox: HTMLInputElement;
  diapasonCheckbox: HTMLInputElement;
  verticalCheckbox: HTMLInputElement;
};

class ConfigPanel {
  domParent: HTMLElement;

  slider: Slider;

  domElements: DomElements;

  constructor(domParent: HTMLElement, slider: Slider) {
    this.slider = slider;
    this.domParent = domParent;
  }

  init = () => {
    this.renderPanel();
    this.slider.subscribe('modelOptionsUpdate', this.onOptionsUpdate);
  };

  private renderPanel = () => {
    this.mountPanel();
    this.saveDom();
    this.toggleHangingInputs();
    this.setListeners();
  };

  private mountPanel = () => {
    this.domParent.appendChild(this.getPanelContainer());
  };

  private getPanelContainer = () => {
    const configPanelContainer = document.createElement('div');
    const classNames = { ...configPanelClassName };
    const {
      currentValues,
      range,
      withRuler,
      withThumb,
      step,
      orientation,
      maxDecimalPlace,
      rulerStep,
    } = this.slider.getModelOptions();
    const configPanelOptions = {
      classNames,
      currentValues,
      range,
      withRuler,
      withThumb,
      step,
      isRange: this.hasRange(),
      isVertical: orientation === 'vertical',
      maxDecimalPlace,
      rulerStep,
    };

    configPanelContainer.innerHTML = configPanelTemplate(configPanelOptions);
    return configPanelContainer;
  };

  private toggleHangingInputs = () => {
    const {
      maxCurrentValueContainer,
      maxDecimalPlaceContainer,
      rulerStepContainer,
    } = this.domElements;
    const { hidedValueContainer } = configPanelClassName;

    if (this.hasFractional()) {
      maxDecimalPlaceContainer.classList.remove(hidedValueContainer);
    } else {
      maxDecimalPlaceContainer.classList.add(hidedValueContainer);
    }

    if (this.hasRange()) {
      maxCurrentValueContainer.classList.remove(hidedValueContainer);
    } else {
      maxCurrentValueContainer.classList.add(hidedValueContainer);
    }

    const { withRuler } = this.slider.getModelOptions();
    if (withRuler) {
      rulerStepContainer.classList.remove(hidedValueContainer);
    } else {
      rulerStepContainer.classList.add(hidedValueContainer);
    }
  };

  private saveDom = () => {
    const {
      valuesContainer: valuesContainerClass,
      stepInput: stepInputClass,
      rulerStepInput: rulerStepInputClass,
      rulerStepContainer: rulerStepContainerClass,
      minRangeInput: minRangeInputClass,
      maxRangeInput: maxRangeInputClass,
      maxDecimalPlaceContainer: maxDecimalPlaceContainerClass,
      maxDecimalPlaceInput: maxDecimalPlaceInputClass,
      thumbCheckbox: thumbCheckboxClass,
      rulerCheckbox: rulerCheckboxClass,
      diapasonCheckbox: diapasonCheckboxClass,
      verticalCheckbox: verticalCheckboxClass,
      currentValueContainer: currentValueContainerClass,
      currentValueInput: currentValueInputClass,
      maxCurrentValueContainer: maxCurrentValueContainerClass,
      maxCurrentValueInput: maxCurrentValueInputClass,
    } = configPanelClassName;

    const valuesContainer = this.domParent.querySelector(`.${valuesContainerClass}`) as HTMLElement;
    const currentValueContainer = this.domParent.querySelector(
      `.${currentValueContainerClass}`,
    ) as HTMLElement;

    const currentValueInput = this.domParent.querySelector(
      `.${currentValueInputClass}`,
    ) as HTMLInputElement;

    const stepInput = this.domParent.querySelector(`.${stepInputClass}`) as HTMLInputElement;

    const rulerStepContainer = this.domParent.querySelector(
      `.${rulerStepContainerClass}`,
    ) as HTMLInputElement;

    const rulerStepInput = this.domParent.querySelector(
      `.${rulerStepInputClass}`,
    ) as HTMLInputElement;

    const minRangeInput = this.domParent.querySelector(
      `.${minRangeInputClass}`,
    ) as HTMLInputElement;

    const maxRangeInput = this.domParent.querySelector(
      `.${maxRangeInputClass}`,
    ) as HTMLInputElement;

    const thumbCheckbox = this.domParent.querySelector(
      `.${thumbCheckboxClass}`,
    ) as HTMLInputElement;

    const rulerCheckbox = this.domParent.querySelector(
      `.${rulerCheckboxClass}`,
    ) as HTMLInputElement;

    const diapasonCheckbox = this.domParent.querySelector(
      `.${diapasonCheckboxClass}`,
    ) as HTMLInputElement;

    const verticalCheckbox = this.domParent.querySelector(
      `.${verticalCheckboxClass}`,
    ) as HTMLInputElement;

    const maxDecimalPlaceContainer = this.domParent.querySelector(
      `.${maxDecimalPlaceContainerClass}`,
    ) as HTMLInputElement;

    const maxDecimalPlaceInput = this.domParent.querySelector(
      `.${maxDecimalPlaceInputClass}`,
    ) as HTMLInputElement;

    const maxCurrentValueContainer = this.domParent.querySelector(
      `.${maxCurrentValueContainerClass}`,
    ) as HTMLElement;

    const maxCurrentValueInput = this.domParent.querySelector(
      `.${maxCurrentValueInputClass}`,
    ) as HTMLInputElement;

    this.domElements = {
      valuesContainer,
      currentValueContainer,
      currentValueInput,
      maxCurrentValueContainer,
      maxCurrentValueInput,
      stepInput,
      rulerStepInput,
      rulerStepContainer,
      minRangeInput,
      maxRangeInput,
      thumbCheckbox,
      maxDecimalPlaceContainer,
      maxDecimalPlaceInput,
      rulerCheckbox,
      diapasonCheckbox,
      verticalCheckbox,
    };
  };

  private setListeners = () => {
    const {
      currentValueInput,
      stepInput,
      maxCurrentValueInput,
      rulerStepInput,
      minRangeInput,
      maxRangeInput,
      maxDecimalPlaceInput,
      thumbCheckbox,
      rulerCheckbox,
      diapasonCheckbox,
      verticalCheckbox,
    } = this.domElements;

    currentValueInput.addEventListener('input', this.debounceInput);
    stepInput.addEventListener('input', this.debounceInput);
    rulerStepInput.addEventListener('input', this.debounceInput);
    minRangeInput.addEventListener('input', this.debounceInput);
    maxRangeInput.addEventListener('input', this.debounceInput);

    thumbCheckbox.addEventListener('change', this.onCheckboxChange);
    rulerCheckbox.addEventListener('change', this.onCheckboxChange);
    diapasonCheckbox.addEventListener('change', this.onDiapasonChange);
    verticalCheckbox.addEventListener('change', this.onVerticalChange);

    if (this.hasRange()) {
      maxCurrentValueInput.addEventListener('input', this.debounceInput);
    }

    if (this.hasFractional()) {
      maxDecimalPlaceInput.addEventListener('input', this.debounceInput);
    }
  };

  private debounceInput = debounce(() => {
    const newOptions = this.getNewModelOptions();
    this.slider.updateOptions(newOptions);
  });

  private getNewModelOptions = () => {
    const {
      minRangeInput,
      maxRangeInput,
      currentValueInput,
      maxCurrentValueInput,
      maxDecimalPlaceInput,
      stepInput,
      rulerStepInput,
    } = this.domElements;
    const newOptions: IModelOptions = { ...this.slider.getModelOptions() };

    newOptions.step = +stepInput.value;
    newOptions.rulerStep = +rulerStepInput.value;

    const newRange = {
      min: +minRangeInput.value,
      max: +maxRangeInput.value,
    };

    newOptions.range = newRange;

    const currentValues: CurrentValues = { min: +currentValueInput.value };

    if (this.hasRange()) {
      currentValues.max = +maxCurrentValueInput.value;
    }

    newOptions.currentValues = currentValues;

    if (this.hasFractional()) {
      newOptions.maxDecimalPlace = +maxDecimalPlaceInput.value;
    }

    return newOptions;
  };

  private onCheckboxChange = (evt: Event) => {
    const target = <HTMLInputElement>evt.target;
    const nameOptions = target.getAttribute('data-value-name') as 'withRuler' | 'withThumb';
    const newOptions = { ...this.slider.getModelOptions() };
    newOptions[nameOptions] = target.checked;
    this.slider.updateOptions(newOptions);
  };

  private onVerticalChange = (evt: Event) => {
    const newOptions = { ...this.slider.getModelOptions() };
    const newIsVertical = (<HTMLInputElement>evt.target).checked;
    newOptions.orientation = newIsVertical ? 'vertical' : 'horizontal';
    this.toggleOrientation();
    this.slider.updateOptions(newOptions);
  };

  private onDiapasonChange = (evt: Event) => {
    const newOptions = { ...this.slider.getModelOptions() };
    const newCurrentValues = { ...this.slider.getModelOptions().currentValues };
    const newIsRange = (<HTMLInputElement>evt.target).checked;

    if (newIsRange) {
      const { range } = newOptions;
      newCurrentValues.max = range.max;
    } else {
      delete newCurrentValues.max;
    }

    newOptions.currentValues = newCurrentValues;
    this.slider.updateOptions(newOptions);
  };

  private toggleOrientation = () => {
    const sliderParent = this.slider.getDomParent();
    const sliderWrap = sliderParent.querySelector('.range-slider__wrap');
    sliderParent.classList.toggle('config-panel__slider_vertical');
    sliderWrap.classList.toggle('config-panel__slider_vertical');
  };

  private onOptionsUpdate = () => {
    const {
      minRangeInput,
      maxRangeInput,
      currentValueInput,
      maxCurrentValueInput,
      maxDecimalPlaceInput,
      stepInput,
      rulerStepInput,
      rulerCheckbox,
      thumbCheckbox,
    } = this.domElements;

    const {
      currentValues,
      step,
      range,
      withRuler,
      withThumb,
      rulerStep,
      maxDecimalPlace,
    } = this.slider.getModelOptions();

    stepInput.value = `${step}`;
    rulerStepInput.value = `${rulerStep}`;
    minRangeInput.value = `${range.min}`;
    maxRangeInput.value = `${range.max}`;
    rulerCheckbox.checked = withRuler;
    thumbCheckbox.checked = withThumb;

    if (this.hasRange()) {
      currentValueInput.value = `${currentValues.min}`;
      maxCurrentValueInput.value = `${currentValues.max}`;
    } else {
      currentValueInput.value = `${currentValues.min}`;
    }

    if (this.hasFractional()) {
      maxDecimalPlaceInput.value = `${maxDecimalPlace}`;
    }

    this.toggleHangingInputs();
  };

  private hasRange = (): boolean => {
    const { currentValues } = this.slider.getModelOptions();
    return has(currentValues, 'max');
  };

  private hasFractional = () => {
    const { withRuler } = this.slider.getModelOptions();
    if (withRuler) {
      const rulerNumbers = this.slider.getRulerValues();
      return rulerNumbers.some((num) => !Number.isInteger(num));
    }

    return false;
  };
}

export default ConfigPanel;
