import View from './View';

import sliderClassNames from './utils/sliderClassNames';
import defaultOptions from '../defaultOptions';
import IModelOptions from '../interfaces/IModelOptions';

let modelOptions: IModelOptions;

beforeEach(() => {
  document.body.innerHTML = '<div class="js-default-slider"></div>';
  modelOptions = {
    ...defaultOptions,
  };
});

describe('View', () => {
  it('создает слайдер в DOM', () => {
    const view = new View(modelOptions, document.querySelector('.js-default-slider'));
    view.render();
    expect(document.querySelectorAll(`.${sliderClassNames.slider}`).length).toEqual(1);
    expect(document.querySelectorAll(`.${sliderClassNames.wrap}`).length).toEqual(1);
    expect(document.querySelectorAll(`.${sliderClassNames.scale}`).length).toEqual(1);
    expect(document.querySelectorAll(`.${sliderClassNames.bar}`).length).toEqual(1);
    expect(document.querySelectorAll(`.${sliderClassNames.toggle}`).length).toEqual(1);
    expect(document.querySelectorAll(`.${sliderClassNames.ruler}`).length).toEqual(0);
  });

  it('создает корректную верстку для rangeSlider', () => {
    const rangeSliderOptions: IModelOptions = {
      ...modelOptions,
      currentValues: { min: 15, max: 25 },
    };

    const view = new View(rangeSliderOptions, document.querySelector('.js-default-slider'));
    view.render();
    expect(document.querySelectorAll(`.${sliderClassNames.slider}`).length).toEqual(1);
    expect(document.querySelectorAll(`.${sliderClassNames.wrap}`).length).toEqual(1);
    expect(document.querySelectorAll(`.${sliderClassNames.scale}`).length).toEqual(1);
    expect(document.querySelectorAll(`.${sliderClassNames.bar}`).length).toEqual(1);
    expect(document.querySelectorAll(`.${sliderClassNames.toggle}`).length).toEqual(2);
  });

  it('создает корректную верстку для слайдера с ruler', () => {
    const rangeSliderOptions = { ...modelOptions, withRuler: true };
    const view = new View(rangeSliderOptions, document.querySelector('.js-default-slider'));
    view.render();
    expect(document.querySelectorAll(`.${sliderClassNames.slider}`).length).toEqual(1);
    expect(document.querySelectorAll(`.${sliderClassNames.wrap}`).length).toEqual(1);
    expect(document.querySelectorAll(`.${sliderClassNames.scale}`).length).toEqual(1);
    expect(document.querySelectorAll(`.${sliderClassNames.bar}`).length).toEqual(1);
    expect(document.querySelectorAll(`.${sliderClassNames.ruler}`).length).toEqual(1);
  });

  it('создает корректную верстку для слайдера без ruler', () => {
    const rangeSliderOptions = { ...modelOptions, withRuler: false };
    const view = new View(rangeSliderOptions, document.querySelector('.js-default-slider'));
    view.render();
    expect(document.querySelectorAll(`.${sliderClassNames.slider}`).length).toEqual(1);
    expect(document.querySelectorAll(`.${sliderClassNames.wrap}`).length).toEqual(1);
    expect(document.querySelectorAll(`.${sliderClassNames.scale}`).length).toEqual(1);
    expect(document.querySelectorAll(`.${sliderClassNames.bar}`).length).toEqual(1);
    expect(document.querySelectorAll(`.${sliderClassNames.ruler}`).length).toEqual(0);
  });

  it('создает корректную верстку для слайдера с thumb', () => {
    const rangeSliderOptions = { ...modelOptions, withThumb: true };
    const view = new View(rangeSliderOptions, document.querySelector('.js-default-slider'));
    view.render();
    expect(document.querySelectorAll(`.${sliderClassNames.slider}`).length).toEqual(1);
    expect(document.querySelectorAll(`.${sliderClassNames.wrap}`).length).toEqual(1);
    expect(document.querySelectorAll(`.${sliderClassNames.scale}`).length).toEqual(1);
    expect(document.querySelectorAll(`.${sliderClassNames.bar}`).length).toEqual(1);
    expect(document.querySelectorAll(`.${sliderClassNames.thumb}`).length).toEqual(1);
  });

  it('создает корректную верстку для слайдера без thumb', () => {
    const rangeSliderOptions = { ...modelOptions, withThumb: false };
    const view = new View(rangeSliderOptions, document.querySelector('.js-default-slider'));
    view.render();
    expect(document.querySelectorAll(`.${sliderClassNames.slider}`).length).toEqual(1);
    expect(document.querySelectorAll(`.${sliderClassNames.wrap}`).length).toEqual(1);
    expect(document.querySelectorAll(`.${sliderClassNames.scale}`).length).toEqual(1);
    expect(document.querySelectorAll(`.${sliderClassNames.bar}`).length).toEqual(1);
    expect(document.querySelectorAll(`.${sliderClassNames.thumb}`).length).toEqual(0);
  });

  it('создает вертикальный слайдер', () => {
    const rangeSliderOptions: IModelOptions = { ...modelOptions, orientation: 'vertical' };
    const view = new View(rangeSliderOptions, document.querySelector('.js-default-slider'));
    view.render();
    const isBarHaveVerticalClass = document
      .querySelector(`.${sliderClassNames.bar}`)
      .classList.contains(`${sliderClassNames.barVertical}`);
    const isToggleHaveVerticalClass = document
      .querySelector(`.${sliderClassNames.toggle}`)
      .classList.contains(`${sliderClassNames.toggleVertical}`);
    expect(document.querySelectorAll(`.${sliderClassNames.slider}`).length).toEqual(1);
    expect(document.querySelectorAll(`.${sliderClassNames.wrap}`).length).toEqual(1);
    expect(document.querySelectorAll(`.${sliderClassNames.scale}`).length).toEqual(1);
    expect(document.querySelectorAll(`.${sliderClassNames.bar}`).length).toEqual(1);
    expect(isBarHaveVerticalClass).toBe(true);
    expect(isToggleHaveVerticalClass).toBe(true);
  });
});
