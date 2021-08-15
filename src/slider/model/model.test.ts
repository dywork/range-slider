import Model from './Model';
import IModelOptions from '../interfaces/IModelOptions';
import defaultOptions from '../defaultOptions';

let modelOptions: IModelOptions;
let model: Model;

beforeEach(() => {
  modelOptions = {
    ...defaultOptions,
  };

  model = new Model(modelOptions);
});

describe('Model', () => {
  it('возвращает текущие настройки слайдера', () => {
    expect(model.getOptions()).toEqual(modelOptions);
  });

  it('обновляет настройки слайдера', () => {
    const newSliderOptions: IModelOptions = {
      ...modelOptions,
      currentValues: { min: 5 },
      range: { min: 2, max: 10 },
    };

    model.updateOptions(newSliderOptions);
    expect(model.getOptions()).toEqual(newSliderOptions);
  });

  it('range не может быть NaN', () => {
    const newSliderOptions: IModelOptions = { ...modelOptions, range: { min: NaN, max: 10 } };
    model.updateOptions(newSliderOptions);
    expect(model.getOptions()).toEqual(newSliderOptions);
    const optionsWithRangeMaxNan: IModelOptions = { ...modelOptions, range: { min: 2, max: NaN } };
    model.updateOptions(optionsWithRangeMaxNan);
    expect(model.getOptions()).toEqual(optionsWithRangeMaxNan);
  });

  it('range.min не может быть > range.max', () => {
    const newSliderOptions: IModelOptions = { ...modelOptions, range: { min: 10, max: 2 } };
    model.updateOptions(newSliderOptions);
    expect(model.getOptions()).toEqual(newSliderOptions);
  });

  it('currentValues.max не может быть > range.max', () => {
    const newSliderOptions: IModelOptions = {
      ...modelOptions,
      currentValues: { max: 11, min: 0 },
      range: { min: 0, max: 10 },
    };
    model.updateOptions(newSliderOptions);
    expect(model.getOptions()).toEqual(newSliderOptions);
  });

  it('currentValues.max не может быть < range.min', () => {
    const newSliderOptions: IModelOptions = {
      ...modelOptions,
      currentValues: { max: -1, min: 0 },
      range: { min: 0, max: 10 },
    };
    model.updateOptions(newSliderOptions);
    expect(model.getOptions()).toEqual(newSliderOptions);
  });

  it('currentValues не может быть NaN', () => {
    const newSliderOptions: IModelOptions = {
      ...modelOptions,
      currentValues: { min: NaN, max: 10 },
    };
    model.updateOptions(newSliderOptions);
    expect(model.getOptions()).toEqual(newSliderOptions);
    const optionsWithCurrentValueMaxNan: IModelOptions = {
      ...modelOptions,
      currentValues: { min: 2, max: NaN },
    };
    model.updateOptions(optionsWithCurrentValueMaxNan);
    expect(model.getOptions()).toEqual(optionsWithCurrentValueMaxNan);
  });

  it('step не может быть меньше 0', () => {
    const newSliderOptions = { ...modelOptions, step: -1 };
    const correctSliderOptions = {
      ...modelOptions,
    };

    model.updateOptions(newSliderOptions);
    expect(model.getOptions()).toEqual(correctSliderOptions);
  });

  it('step не может быть равен 0', () => {
    const newSliderOptions = { ...modelOptions, step: 0 };
    const correctSliderOptions = {
      ...modelOptions,
    };

    model.updateOptions(newSliderOptions);
    expect(model.getOptions()).toEqual(correctSliderOptions);
  });

  it('не пропускает currentValue ниже диапазона range', () => {
    const newSliderOptions: IModelOptions = {
      ...modelOptions,
      currentValues: { min: 1 },
      range: { min: 2, max: 10 },
    };

    const correctSliderOptions: IModelOptions = {
      ...modelOptions,
      currentValues: { min: 2 },
      range: { min: 2, max: 10 },
    };

    model.updateOptions(newSliderOptions);
    expect(model.getOptions()).toEqual(correctSliderOptions);
  });

  it('не пропускает currentValue выше диапазона range', () => {
    const newSliderOptions: IModelOptions = {
      ...modelOptions,
      currentValues: { min: 11 },
      range: { min: 2, max: 10 },
    };

    const correctSliderOptions: IModelOptions = {
      ...modelOptions,
      currentValues: { min: 10 },
      range: { min: 2, max: 10 },
    };

    model.updateOptions(newSliderOptions);
    expect(model.getOptions()).toEqual(correctSliderOptions);
  });

  it('currentValue[0] не может быть больше currentValues[1] и наоборот', () => {
    const newSliderOptions: IModelOptions = {
      ...modelOptions,
      currentValues: { min: 5, max: 3 },
      range: { min: 2, max: 10 },
    };

    const correctSliderOptions: IModelOptions = {
      ...modelOptions,
      currentValues: { min: 2, max: 10 },
      range: { min: 2, max: 10 },
    };

    model.updateOptions(newSliderOptions);
    expect(model.getOptions()).toEqual(correctSliderOptions);
  });
});
