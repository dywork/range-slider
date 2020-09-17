import View from './View';

import ISliderOptions from '../ISliderOptions';

import sliderClassName from './utils/sliderClassName';
import defaultOptions from '../defaultOptions';

let sliderOptions: ISliderOptions;

beforeEach(() => {
  document.body.innerHTML = '<div id="defaultSlider"></div>';
  sliderOptions = {
    domParent: document.querySelector('#defaultSlider') as HTMLElement,
    ...defaultOptions,
  };
});

describe('View', () => {
  it('создает слайдер в DOM', () => {
    const view = new View(sliderOptions);
    view.render();
    expect(document.querySelectorAll(`.${sliderClassName.slider}`).length).toEqual(1);
    expect(document.querySelectorAll(`.${sliderClassName.wrap}`).length).toEqual(1);
    expect(document.querySelectorAll(`.${sliderClassName.scale}`).length).toEqual(1);
    expect(document.querySelectorAll(`.${sliderClassName.bar}`).length).toEqual(1);
    expect(document.querySelectorAll(`.${sliderClassName.toggle}`).length).toEqual(1);
    expect(document.querySelectorAll(`.${sliderClassName.ruler}`).length).toEqual(0);
  });

  it('создает корректную верстку для rangeSlider', () => {
    const rangeSliderOptions = { ...sliderOptions, currentValue: [15, 25] };
    const view = new View(rangeSliderOptions);
    view.render();
    expect(document.querySelectorAll(`.${sliderClassName.slider}`).length).toEqual(1);
    expect(document.querySelectorAll(`.${sliderClassName.wrap}`).length).toEqual(1);
    expect(document.querySelectorAll(`.${sliderClassName.scale}`).length).toEqual(1);
    expect(document.querySelectorAll(`.${sliderClassName.bar}`).length).toEqual(1);
    expect(document.querySelectorAll(`.${sliderClassName.toggle}`).length).toEqual(2);
  });
});
