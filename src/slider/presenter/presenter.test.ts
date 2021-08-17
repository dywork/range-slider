import Presenter from './Presenter';
import ISliderOptions from '../interfaces/ISliderOptions';
import defaultOptions from '../defaultOptions';

let sliderOptions: ISliderOptions;

beforeEach(() => {
  sliderOptions = {
    domParent: document.createElement('div'),
    ...defaultOptions,
  };
});

describe('Presenter', () => {
  it('инициализируется', () => {
    const presenter = new Presenter(sliderOptions);
    presenter.init();
    expect.call(presenter.init);
  });

  it('обновляет настройки слайдера', () => {
    const presenter = new Presenter(sliderOptions);
    const newSliderOptions = { ...sliderOptions, currentValue: 5, range: { min: 2, max: 10 } };
    presenter.updateOptions(newSliderOptions);
    expect.call(presenter.updateOptions);
  });

  // it('обновляет currentValues при изменении диапазона', () => {
  //   document.body.innerHTML = '<div class="js-default-slider"></div>';
  //   console.log(document.body.innerHTML);
  //   const presenter = new Presenter({
  //     ...sliderOptions,
  //     domParent: document.querySelector('.js-default-slider'),
  //   });
  //   const newModelOptions = { ...defaultOptions, currentValues: { min: 10, max: 15 } };
  //   presenter.updateOptions(newModelOptions);
  //   const { currentValues } = presenter.getModelOptions();
  //   expect(currentValues.max).toBe(15);
  // });
});
