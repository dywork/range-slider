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
      currentValues: [5],
      range: { min: 2, max: 10 },
    };

    model.updateOptions(newSliderOptions);
    expect(model.getOptions()).toEqual(newSliderOptions);
  });

  it('step не может быть меньше 0', () => {
    const newSliderOptions = { ...modelOptions, step: -1 };
    const correctSliderOptions = {
      ...modelOptions,
    };

    model.updateOptions(newSliderOptions);
    expect(model.getOptions()).toEqual(correctSliderOptions);
  });

  it('не пропускает currentValue ниже диапазона range', () => {
    const newSliderOptions: IModelOptions = {
      ...modelOptions,
      currentValues: [1],
      range: { min: 2, max: 10 },
    };

    const correctSliderOptions: IModelOptions = {
      ...modelOptions,
      currentValues: [10],
      range: { min: 2, max: 10 },
    };
    model.updateOptions(newSliderOptions);
    expect(model.getOptions()).toEqual(correctSliderOptions);
  });

  it('не пропускает currentValue выше диапазона range', () => {
    const newSliderOptions: IModelOptions = {
      ...modelOptions,
      currentValues: [11],
      range: { min: 2, max: 10 },
    };

    const correctSliderOptions: IModelOptions = {
      ...modelOptions,
      currentValues: [10],
      range: { min: 2, max: 10 },
    };
    model.updateOptions(newSliderOptions);
    expect(model.getOptions()).toEqual(correctSliderOptions);
  });

  it('currentValue[0] не может быть больше currentValues[1] и наоборот', () => {
    const newSliderOptions: IModelOptions = {
      ...modelOptions,
      currentValues: [5, 3],
      range: { min: 2, max: 10 },
    };

    const correctSliderOptions: IModelOptions = {
      ...modelOptions,
      currentValues: [2, 10],
      range: { min: 2, max: 10 },
    };
    model.updateOptions(newSliderOptions);
    expect(model.getOptions()).toEqual(correctSliderOptions);
  });
});
