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
});
