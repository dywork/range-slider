import Presenter from './Presenter';
import ISliderOptions from '../interfaces/ISliderOptions';

describe('Presenter', () => {
  it('инициализируется', () => {
    const sliderOptions: ISliderOptions = { currentValue: 0, range: { min: 0, max: 100 } };
    const presenter = new Presenter(sliderOptions);
    const presenterInitSpy = jasmine.createSpy('init', presenter.init);
    presenter.init();
    expect.call(presenterInitSpy);
  });
});
