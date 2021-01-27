import Model from './Model';
import ISliderOptions from '../ISliderOptions';
import defaultOptions from '../defaultOptions';

let sliderOptions: ISliderOptions;
let model: Model;

beforeEach(() => {
  sliderOptions = {
    domParent: document.createElement('div'),
    ...defaultOptions,
  };

  model = new Model(sliderOptions);
});

describe('Model', () => {
  it('возвращает текущие настройки слайдера', () => {
    expect(model.getOptions()).toEqual(sliderOptions);
  });

  it('обновляет настройки слайдера', () => {
    const newSliderOptions = { ...sliderOptions, currentValue: 5, range: { min: 2, max: 10 } };
    model.updateSliderOptions(newSliderOptions);
    expect(model.getOptions()).toEqual(newSliderOptions);
  });

  it('не пропускает currentValue ниже диапазона range', () => {
    const newSliderOptions = { ...sliderOptions, currentValue: 1, range: { min: 2, max: 10 } };
    const correctSliderOptions = { ...sliderOptions, currentValue: 2, range: { min: 2, max: 10 } };
    model.updateSliderOptions(newSliderOptions);
    expect(model.getOptions()).toEqual(correctSliderOptions);
  });

  it('не пропускает currentValue выше диапазона range', () => {
    const newSliderOptions = { ...sliderOptions, currentValue: 11, range: { min: 2, max: 10 } };
    const correctSliderOptions = { ...sliderOptions, currentValue: 10, range: { min: 2, max: 10 } };
    model.updateSliderOptions(newSliderOptions);
    expect(model.getOptions()).toEqual(correctSliderOptions);
  });
});
