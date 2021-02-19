interface IConfigPanelClassName {
  minCurrentValueContainer: string;
  maxCurrentValueContainer: string;
  minCurrentValueInput: string;
  maxCurrentValueInput: string;
  currentValueContainer: string;
  currentValueInput: string;
  valuesContainer: string;
  stepInput: string;
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
  currentValueContainer: 'config-panel__value_current-value',
  currentValueInput: 'current-value',
  valuesContainer: 'config-panel__values',
  stepInput: 'step',
  minRangeInput: 'min-range-value',
  maxRangeInput: 'max-range-value',
  thumbCheckbox: 'thumb-show',
  rulerCheckbox: 'ruler-show',
  diapasonCheckbox: 'diapason',
  verticalCheckbox: 'vertical',
};

export default configPanelClassName;
