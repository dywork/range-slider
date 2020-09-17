import Presenter from './Presenter';
import ISLiderOptions from '../ISliderOptions';
import defaultOptions from '../defaultOptions';

let sliderOptions: ISLiderOptions;

beforeEach(() => {
  sliderOptions = {
    domParent: document.createElement('div'),
    ...defaultOptions,
  };
});

describe('Presenter', () => {
  it('инициализируется', () => {
    const presenter = new Presenter(sliderOptions);
    spyOn(presenter, 'init');
    presenter.init();
    expect.call(presenter.init);
  });

  it('обновляет настройки слайдера', () => {
    const presenter = new Presenter(sliderOptions);
    const newSliderOptions = { ...sliderOptions, currentValue: 5, range: { min: 2, max: 10 } };
    spyOn(presenter, 'dispatchSliderOptions');
    presenter.dispatchSliderOptions(newSliderOptions);
    expect.call(presenter.dispatchSliderOptions);
  });
});
