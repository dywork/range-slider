interface IConfigPanelClassName {
  minCurrentValueContainer: string;
  maxCurrentValueContainer: string;
  minCurrentValueInput: string;
  maxCurrentValueInput: string;
  maxDecimalPlaceInput: string;
  currentValueContainer: string;
  currentValueInput: string;
  valuesContainer: string;
  valueContainer: string;
  valueLabel: string;
  stepInput: string;
  rulerStepInput: string;
  minRangeInput: string;
  maxRangeInput: string;
  thumbCheckbox: string;
  rulerCheckbox: string;
  diapasonCheckbox: string;
  verticalCheckbox: string;
}

const configPanelClassName: IConfigPanelClassName = {
  minCurrentValueContainer: 'config-panel__value_current-min-value',
  maxCurrentValueContainer: 'config-panel__value_current-max-value',
  minCurrentValueInput: 'current-min-value',
  maxCurrentValueInput: 'current-max-value',
  maxDecimalPlaceInput: 'max-decimal-place',
  currentValueContainer: 'config-panel__value_current-value',
  currentValueInput: 'current-value',
  valuesContainer: 'config-panel__values',
  valueContainer: 'config-panel__value',
  valueLabel: 'config-panel__label',
  stepInput: 'step',
  rulerStepInput: 'ruler-step',
  minRangeInput: 'min-range-value',
  maxRangeInput: 'max-range-value',
  thumbCheckbox: 'thumb-show',
  rulerCheckbox: 'ruler-show',
  diapasonCheckbox: 'diapason',
  verticalCheckbox: 'vertical',
};

export default configPanelClassName;
