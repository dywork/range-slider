import has from 'has';
import configPanelClassName from './utils/configPanelClassName';
import sliderClassNames from '../../slider/view/utils/sliderClassNames';
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
  minRangeInput: HTMLInputElement;
  maxRangeInput: HTMLInputElement;
  thumbCheckbox: HTMLInputElement;
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
      currentValues, range, withRuler, withThumb, step, orientation,
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
    };

    configPanelContainer.innerHTML = configPanelTemplate(configPanelOptions);
    return configPanelContainer;
  };

  private toggleHangingInputs = () => {
    const { maxCurrentValueContainer } = this.domElements;
    const { hidedValueContainer } = configPanelClassName;

    if (this.hasRange()) {
      maxCurrentValueContainer.classList.remove(hidedValueContainer);
    } else {
      maxCurrentValueContainer.classList.add(hidedValueContainer);
    }
  };

  private saveDom = () => {
    const {
      valuesContainer: valuesContainerClass,
      stepInput: stepInputClass,
      minRangeInput: minRangeInputClass,
      maxRangeInput: maxRangeInputClass,
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
      minRangeInput,
      maxRangeInput,
      thumbCheckbox,
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
      minRangeInput,
      maxRangeInput,
      thumbCheckbox,
      rulerCheckbox,
      diapasonCheckbox,
      verticalCheckbox,
    } = this.domElements;

    currentValueInput.addEventListener('input', this.handleInput);
    stepInput.addEventListener('input', this.handleInput);
    minRangeInput.addEventListener('input', this.handleInput);
    maxRangeInput.addEventListener('input', this.handleInput);

    thumbCheckbox.addEventListener('change', this.handleCheckboxChange);
    rulerCheckbox.addEventListener('change', this.handleCheckboxChange);
    diapasonCheckbox.addEventListener('change', this.handleDiapasonChange);
    verticalCheckbox.addEventListener('change', this.handleVerticalChange);

    if (this.hasRange()) {
      maxCurrentValueInput.addEventListener('input', this.handleInput);
    }
  };

  private handleInput = debounce(() => {
    const newOptions = this.getNewModelOptions();
    this.slider.updateOptions(newOptions);
  });

  private getNewModelOptions = () => {
    const {
      minRangeInput, maxRangeInput, currentValueInput, maxCurrentValueInput, stepInput,
    } = this.domElements;
    const newOptions: IModelOptions = { ...this.slider.getModelOptions() };

    newOptions.step = +stepInput.value;

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

    return newOptions;
  };

  private handleCheckboxChange = (evt: Event) => {
    const target = <HTMLInputElement>evt.target;
    const nameOptions = target.getAttribute('data-value-name') as 'withRuler' | 'withThumb';
    const newOptions = { ...this.slider.getModelOptions() };
    newOptions[nameOptions] = target.checked;
    this.slider.updateOptions(newOptions);
  };

  private handleVerticalChange = (evt: Event) => {
    const newOptions = { ...this.slider.getModelOptions() };
    const newIsVertical = (<HTMLInputElement>evt.target).checked;
    newOptions.orientation = newIsVertical ? 'vertical' : 'horizontal';
    this.toggleOrientation();
    this.slider.updateOptions(newOptions);
  };

  private handleDiapasonChange = (evt: Event) => {
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
    const { wrap } = sliderClassNames;
    const { verticalSlider } = configPanelClassName;
    const sliderParent = this.slider.getDomParent();
    const sliderWrap = sliderParent.querySelector(`.${wrap}`);
    sliderParent.classList.toggle(verticalSlider);
    sliderWrap.classList.toggle(verticalSlider);
  };

  private onOptionsUpdate = () => {
    const {
      minRangeInput,
      maxRangeInput,
      currentValueInput,
      maxCurrentValueInput,
      stepInput,
      rulerCheckbox,
      thumbCheckbox,
    } = this.domElements;

    const {
      currentValues, step, range, withRuler, withThumb,
    } = this.slider.getModelOptions();

    stepInput.value = `${step}`;
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

    this.toggleHangingInputs();
  };

  private hasRange = (): boolean => {
    const { currentValues } = this.slider.getModelOptions();
    return has(currentValues, 'max');
  };
}

export default ConfigPanel;
