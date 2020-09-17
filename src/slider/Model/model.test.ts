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

// import Model from './Model';
// import ISliderOptions from '../ISliderOptions';

// let sliderOptions: ISliderOptions;
// let model: Model;

// beforeEach(() => {
// const sliderOptions: ISliderOptions = { domParent: '' };
// model = new Model(defaultOptions);
// });

// describe('Model', () => {
//   it('возвращает текущие настройки слайдера', () => {
//     expect(model.getOptions().currentValue).toBe(sliderOptions.currentValue);
//     expect(model.getOptions().range.min).toBe(sliderOptions.range.min);
//     expect(model.getOptions().range.max).toBe(sliderOptions.range.max);
//   });

//   it('обновляет настройки слайдера', () => {
//     const newSliderOptions: ISliderOptions = {
//       currentValue: 20,
//       range: { min: 20, max: 30 },
//       step: 0,
//     };
//     model.subscribe('sliderOptionsUpdate', () => {});
//     model.updateSliderOptions(newSliderOptions);
//     expect(model.getOptions().currentValue).toBe(newSliderOptions.currentValue);
//     expect(model.getOptions().range.min).toBe(newSliderOptions.range.min);
//     expect(model.getOptions().range.max).toBe(newSliderOptions.range.max);
//   });
// });
