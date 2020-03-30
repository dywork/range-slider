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
    expect(model.getOptions()).toBe(sliderOptions);
  });
});
