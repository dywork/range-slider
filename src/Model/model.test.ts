import Model from './Model';
import ISliderOptions from '../interfaces/ISliderOptions';

describe('Model', () => {
  it('возвращает текущие настройки слайдера', () => {
    const sliderOptions: ISliderOptions = { currentValue: 0, range: { min: 0, max: 100 } };
    const model = new Model(sliderOptions);
    expect(model.getOptions()).toBe(sliderOptions);
  });
});
