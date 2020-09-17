import Model from './Model';
import ISLiderOptions from '../ISliderOptions';
import defaultOptions from '../defaultOptions';

let sliderOptions: ISLiderOptions;
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
});
