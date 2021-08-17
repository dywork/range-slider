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
    const rangeSliderOptions: IModelOptions = {
      ...modelOptions,
      orientation: 'vertical',
      withRuler: true,
    };
    const view = new View(rangeSliderOptions, document.querySelector('.js-default-slider'));
    view.render();
    const isBarHaveVerticalClass = document
      .querySelector(`.${sliderClassNames.bar}`)
      .classList.contains(`${sliderClassNames.barVertical}`);
    const isToggleHaveVerticalClass = document
      .querySelector(`.${sliderClassNames.toggle}`)
      .classList.contains(`${sliderClassNames.toggleVertical}`);
    const isRulerHaveVerticalClass = document
      .querySelector(`.${sliderClassNames.ruler}`)
      .classList.contains(`${sliderClassNames.rulerVertical}`);
    expect(document.querySelectorAll(`.${sliderClassNames.slider}`).length).toEqual(1);
    expect(document.querySelectorAll(`.${sliderClassNames.wrap}`).length).toEqual(1);
    expect(document.querySelectorAll(`.${sliderClassNames.scale}`).length).toEqual(1);
    expect(document.querySelectorAll(`.${sliderClassNames.bar}`).length).toEqual(1);
    expect(isBarHaveVerticalClass).toBeTruthy();
    expect(isToggleHaveVerticalClass).toBeTruthy();
    expect(isRulerHaveVerticalClass).toBeTruthy();
  });

  it('уведомляет при клике на bar', () => {
    const rangeSliderOptions = { ...modelOptions };
    const view = new View(rangeSliderOptions, document.querySelector('.js-default-slider'));
    const spy = jest.spyOn(view, 'notify');
    view.render();
    const bar = document.querySelector(`.${sliderClassNames.bar}`) as HTMLElement;
    bar.click();
    expect(spy).toBeCalled();
  });

  it('обрабатывает клик по bar с currentValues.min и currentValues.max', () => {
    const rangeSliderOptions = { ...modelOptions, currentValues: { min: 15, max: 16 } };
    const view = new View(rangeSliderOptions, document.querySelector('.js-default-slider'));
    const spy = jest.spyOn(view, 'notify');
    view.render();
    const bar = document.querySelector(`.${sliderClassNames.bar}`) as HTMLElement;
    bar.click();
    expect(spy).toBeCalled();
  });

  it('обрабатывает клик по bar при currentValue.min === currentValue.max', () => {
    const rangeSliderOptions = { ...modelOptions, currentValues: { min: 15, max: 15 } };
    const view = new View(rangeSliderOptions, document.querySelector('.js-default-slider'));
    const spy = jest.spyOn(view, 'notify');
    view.render();
    const bar = document.querySelector(`.${sliderClassNames.bar}`) as HTMLElement;
    bar.click();
    expect(spy).toBeCalled();
  });

  it('обрабатывает клик по thumb', () => {
    const rangeSliderOptions = { ...modelOptions };
    const view = new View(rangeSliderOptions, document.querySelector('.js-default-slider'));
    view.render();
    const toggle = document.querySelector(`.${sliderClassNames.toggle}`) as HTMLElement;
    const thumb = document.querySelector(`.${sliderClassNames.thumb}`) as HTMLElement;
    thumb.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    expect(toggle.classList.contains(`${sliderClassNames.toggleActive}`)).toBeTruthy();
  });

  it('уведомляет при mousemove у toggle', () => {
    const rangeSliderOptions = { ...modelOptions };
    const view = new View(rangeSliderOptions, document.querySelector('.js-default-slider'));
    const spy = jest.spyOn(view, 'notify');
    view.render();
    const toggle = document.querySelector(`.${sliderClassNames.handle}`) as HTMLElement;
    toggle.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    document.dispatchEvent(new MouseEvent('mousemove'));
    document.dispatchEvent(new MouseEvent('mouseup'));
    expect(spy).toBeCalled();
  });

  it('уведомляет при mousemove у toggle c withRange', () => {
    const rangeSliderOptions = { ...modelOptions, currentValues: { min: 10, max: 15 } };
    const view = new View(rangeSliderOptions, document.querySelector('.js-default-slider'));
    const spy = jest.spyOn(view, 'notify');
    view.render();
    const toggle = document.querySelector(`.${sliderClassNames.handle}`) as HTMLElement;
    toggle.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    document.dispatchEvent(new MouseEvent('mousemove'));
    document.dispatchEvent(new MouseEvent('mouseup'));
    expect(spy).toBeCalled();
  });

  it('уведомляет при click на ruler', () => {
    const rangeSliderOptions = {
      ...modelOptions,
      withRuler: true,
    };
    const view = new View(rangeSliderOptions, document.querySelector('.js-default-slider'));
    const spy = jest.spyOn(view, 'notify');
    view.render();
    const rulerItem = document.querySelector(`.${sliderClassNames.rulerItem}`) as HTMLElement;
    rulerItem.click();
    expect(spy).toBeCalled();
  });

  it('уведомляет при click на ruler withRange', () => {
    const rangeSliderOptions = {
      ...modelOptions,
      currentValues: { min: 14, max: 15 },
      withRuler: true,
    };
    const view = new View(rangeSliderOptions, document.querySelector('.js-default-slider'));
    const spy = jest.spyOn(view, 'notify');
    view.render();
    const rulerItem = document.querySelector(`.${sliderClassNames.rulerItem}`) as HTMLElement;
    rulerItem.click();
    expect(spy).toBeCalled();
  });

  it('уведомляет при click на ruler где новый currentValues.min больше старого', () => {
    const rangeSliderOptions = {
      ...modelOptions,
      currentValues: { min: 10, max: 15 },
      withRuler: true,
    };
    const view = new View(rangeSliderOptions, document.querySelector('.js-default-slider'));
    const spy = jest.spyOn(view, 'notify');
    view.render();
    const rulerItem = document.querySelectorAll(`.${sliderClassNames.rulerItem}`)[1] as HTMLElement;
    rulerItem.click();
    expect(spy).toBeCalled();
  });

  it('уведомляет при click на ruler где новый currentValues.max больше старого', () => {
    const rangeSliderOptions = {
      ...modelOptions,
      currentValues: { min: 10, max: 15 },
      withRuler: true,
    };
    const view = new View(rangeSliderOptions, document.querySelector('.js-default-slider'));
    const spy = jest.spyOn(view, 'notify');
    view.render();
    const rulerItem = document.querySelectorAll(`.${sliderClassNames.rulerItem}`)[3] as HTMLElement;
    rulerItem.click();
    expect(spy).toBeCalled();
  });

  it('удаляет domParent', () => {
    const rangeSliderOptions = { ...modelOptions, withRuler: true };
    const parentElement = document.querySelector('.js-default-slider') as HTMLElement;
    const view = new View(rangeSliderOptions, parentElement);
    view.render();
    view.destroyDom();
    expect(parentElement.children.length).toBe(0);
  });

  it('обновляет значение currentValues', () => {
    const rangeSliderOptions = { ...modelOptions, withRuler: true };
    const view = new View(rangeSliderOptions, document.querySelector('.js-default-slider'));
    view.render();
    const thumb = document.querySelector(`.${sliderClassNames.thumb}`);
    const thumbValue = Number(thumb.textContent);
    const newMinValue = 15;
    view.updateModelOptions({ ...modelOptions, currentValues: { min: newMinValue } });
    const newThumbValue = Number(thumb.textContent);
    expect(thumbValue).not.toBe(newThumbValue);
  });

  it('обрабатывает случай когда обновленный currentVale > range.max', () => {
    const rangeSliderOptions = { ...modelOptions, currentValues: { min: 10, max: 30 } };
    const view = new View(rangeSliderOptions, document.querySelector('.js-default-slider'));
    view.render();
    const thumb = document.querySelector(`.${sliderClassNames.thumb}`);
    const thumbValue = Number(thumb.textContent);
    const newMinValue = 31;
    view.updateModelOptions({ ...modelOptions, currentValues: { min: newMinValue } });
    const { max } = modelOptions.range;
    expect(thumbValue).not.toBe(max);
  });
});
