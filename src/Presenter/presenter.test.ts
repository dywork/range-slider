import Presenter from './Presenter';
import ISliderOptions from '../interfaces/ISliderOptions';

describe('Presenter', () => {
  it('инициализируется', () => {
    const sliderOptions: ISliderOptions = { currentValue: 0, range: { min: 0, max: 100 } };
    const parentDom = document.createElement('div');
    const presenter = new Presenter(parentDom, sliderOptions);
    spyOn(presenter, 'init');
    presenter.init();
    expect.call(presenter.init);
  });
});
