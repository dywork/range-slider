import Model from './Model';
import ISliderOptions from '../interfaces/ISliderOptions';

let sliderOptions: ISliderOptions;
let model: Model;

beforeEach(() => {
  sliderOptions = { currentValue: 0, range: { min: 0, max: 100 } };
  model = new Model(sliderOptions);
});

describe('Model', () => {
  it('возвращает текущие настройки слайдера', () => {
    expect(model.getOptions().currentValue).toBe(sliderOptions.currentValue);
    expect(model.getOptions().range.min).toBe(sliderOptions.range.min);
    expect(model.getOptions().range.max).toBe(sliderOptions.range.max);
  });

  it('обновляет настройки слайдера', () => {
    const newSliderOptions: ISliderOptions = { currentValue: 20, range: { min: 20, max: 30 } };
    model.subscribe('sliderOptionsUpdate', () => {});
    model.updateSliderOptions(newSliderOptions);
    expect(model.getOptions().currentValue).toBe(newSliderOptions.currentValue);
    expect(model.getOptions().range.min).toBe(newSliderOptions.range.min);
    expect(model.getOptions().range.max).toBe(newSliderOptions.range.max);
  });
});
