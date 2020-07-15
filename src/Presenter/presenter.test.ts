import Presenter from './Presenter';
import { IModelOptions } from '../Model/Model';
import IViewOptions from '../View/IViewOptions';

describe('Presenter', () => {
  it('инициализируется', () => {
    const sliderOptions: IModelOptions = { currentValue: 0, range: { min: 0, max: 100 }, step: 0 };
    const domParent = document.createElement('div');
    const viewOptions: IViewOptions = {
      domParent,
      isRuler: false,
      isThumb: true,
      decimal: 2,
      orientation: 'horizontal',
    };
    const presenter = new Presenter(viewOptions, sliderOptions);
    spyOn(presenter, 'init');
    presenter.init();
    expect.call(presenter.init);
  });
});
