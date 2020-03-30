/* eslint-disable func-names */
import Slider from './Slider';
import ISliderOptions from './interfaces/ISliderOptions';

declare global {
  interface JQuery {
    rangeSlider(options: ISliderOptions): void;
  }
}

(function (jquery) {
  const $ = jquery;
  $.fn.rangeSlider = function (options) {
    let sliderOptions = options;
    // Устанавливаем значения по умолчанию
    sliderOptions = $.extend(
      {
        start: 0,
        currentValue: 0,
        range: {
          min: 0,
          max: 100,
        },
      },
      sliderOptions,
    );
    const slider = new Slider(sliderOptions);
    slider.init();
    // Вернуть this (jQuery объект)
  };
}(jQuery));
