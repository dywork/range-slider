import View from './View';
import sliderClassName from './utils/sliderClassName';
import defaultOptions from '../defaultOptions';

beforeEach(() => {
  document.body.innerHTML = '<div id="defaultSlider"></div>';
});

describe('View', () => {
  it('создает слайдер в DOM', () => {
    const sliderOptions = {
      domParent: document.querySelector('#defaultSlider') as HTMLElement,
      ...defaultOptions,
    };

    const view = new View(sliderOptions);
    view.render();
    expect(document.querySelectorAll(`.${sliderClassName.slider}`).length).toEqual(1);
    expect(document.querySelectorAll(`.${sliderClassName.wrap}`).length).toEqual(1);
    expect(document.querySelectorAll(`.${sliderClassName.scale}`).length).toEqual(1);
    expect(document.querySelectorAll(`.${sliderClassName.bar}`).length).toEqual(1);
    expect(document.querySelectorAll(`.${sliderClassName.toggle}`).length).toEqual(1);
    expect(document.querySelectorAll(`.${sliderClassName.ruler}`).length).toEqual(0);
  });
});
