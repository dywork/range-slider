import View from './View';

import sliderClassName from './utils/sliderClassName';
import defaultOptions from '../defaultOptions';
import IModelOptions from '../interfaces/IModelOptions';

let modelOptions: IModelOptions;

beforeEach(() => {
  document.body.innerHTML = '<div id="defaultSlider"></div>';
  modelOptions = {
    ...defaultOptions,
  };
});

describe('View', () => {
  it('создает слайдер в DOM', () => {
    const view = new View(modelOptions, document.querySelector('#defaultSlider'));
    view.render();
    expect(document.querySelectorAll(`.${sliderClassName.slider}`).length).toEqual(1);
    expect(document.querySelectorAll(`.${sliderClassName.wrap}`).length).toEqual(1);
    expect(document.querySelectorAll(`.${sliderClassName.scale}`).length).toEqual(1);
    expect(document.querySelectorAll(`.${sliderClassName.bar}`).length).toEqual(1);
    expect(document.querySelectorAll(`.${sliderClassName.toggle}`).length).toEqual(1);
    expect(document.querySelectorAll(`.${sliderClassName.ruler}`).length).toEqual(0);
  });

  it('создает корректную верстку для rangeSlider', () => {
    const rangeSliderOptions: IModelOptions = {
      ...modelOptions,
      currentValues: { min: 15, max: 25 },
    };

    const view = new View(rangeSliderOptions, document.querySelector('#defaultSlider'));
    view.render();
    expect(document.querySelectorAll(`.${sliderClassName.slider}`).length).toEqual(1);
    expect(document.querySelectorAll(`.${sliderClassName.wrap}`).length).toEqual(1);
    expect(document.querySelectorAll(`.${sliderClassName.scale}`).length).toEqual(1);
    expect(document.querySelectorAll(`.${sliderClassName.bar}`).length).toEqual(1);
    expect(document.querySelectorAll(`.${sliderClassName.toggle}`).length).toEqual(2);
  });

  it('создает корректную верстку для слайдера с ruler', () => {
    const rangeSliderOptions = { ...modelOptions, withRuler: true };
    const view = new View(rangeSliderOptions, document.querySelector('#defaultSlider'));
    view.render();
    expect(document.querySelectorAll(`.${sliderClassName.slider}`).length).toEqual(1);
    expect(document.querySelectorAll(`.${sliderClassName.wrap}`).length).toEqual(1);
    expect(document.querySelectorAll(`.${sliderClassName.scale}`).length).toEqual(1);
    expect(document.querySelectorAll(`.${sliderClassName.bar}`).length).toEqual(1);
    expect(document.querySelectorAll(`.${sliderClassName.ruler}`).length).toEqual(1);
  });

  it('создает корректную верстку для слайдера без ruler', () => {
    const rangeSliderOptions = { ...modelOptions, withRuler: false };
    const view = new View(rangeSliderOptions, document.querySelector('#defaultSlider'));
    view.render();
    expect(document.querySelectorAll(`.${sliderClassName.slider}`).length).toEqual(1);
    expect(document.querySelectorAll(`.${sliderClassName.wrap}`).length).toEqual(1);
    expect(document.querySelectorAll(`.${sliderClassName.scale}`).length).toEqual(1);
    expect(document.querySelectorAll(`.${sliderClassName.bar}`).length).toEqual(1);
    expect(document.querySelectorAll(`.${sliderClassName.ruler}`).length).toEqual(0);
  });

  it('создает корректную верстку для слайдера с thumb', () => {
    const rangeSliderOptions = { ...modelOptions, withThumb: true };
    const view = new View(rangeSliderOptions, document.querySelector('#defaultSlider'));
    view.render();
    expect(document.querySelectorAll(`.${sliderClassName.slider}`).length).toEqual(1);
    expect(document.querySelectorAll(`.${sliderClassName.wrap}`).length).toEqual(1);
    expect(document.querySelectorAll(`.${sliderClassName.scale}`).length).toEqual(1);
    expect(document.querySelectorAll(`.${sliderClassName.bar}`).length).toEqual(1);
    expect(document.querySelectorAll(`.${sliderClassName.thumb}`).length).toEqual(1);
  });

  it('создает корректную верстку для слайдера без thumb', () => {
    const rangeSliderOptions = { ...modelOptions, withThumb: false };
    const view = new View(rangeSliderOptions, document.querySelector('#defaultSlider'));
    view.render();
    expect(document.querySelectorAll(`.${sliderClassName.slider}`).length).toEqual(1);
    expect(document.querySelectorAll(`.${sliderClassName.wrap}`).length).toEqual(1);
    expect(document.querySelectorAll(`.${sliderClassName.scale}`).length).toEqual(1);
    expect(document.querySelectorAll(`.${sliderClassName.bar}`).length).toEqual(1);
    expect(document.querySelectorAll(`.${sliderClassName.thumb}`).length).toEqual(0);
  });

  it('создает вертикальный слайдер', () => {
    const rangeSliderOptions: IModelOptions = { ...modelOptions, orientation: 'vertical' };
    const view = new View(rangeSliderOptions, document.querySelector('#defaultSlider'));
    view.render();
    const isWrapHaveVerticalClass = document
      .querySelector(`.${sliderClassName.wrap}`)
      .classList.contains(`${sliderClassName.sliderVertical}`);
    expect(document.querySelectorAll(`.${sliderClassName.slider}`).length).toEqual(1);
    expect(document.querySelectorAll(`.${sliderClassName.wrap}`).length).toEqual(1);
    expect(document.querySelectorAll(`.${sliderClassName.scale}`).length).toEqual(1);
    expect(document.querySelectorAll(`.${sliderClassName.bar}`).length).toEqual(1);
    expect(isWrapHaveVerticalClass).toBe(true);
  });
});
