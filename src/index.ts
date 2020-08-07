/* eslint-disable func-names */
import { Slider, ISliderOptions } from './Slider';
import defaultOptions from './defaultOptions';

declare global {
  interface JQuery {
    rangeSlider(options: ISliderOptions): void;
  }
}

(function (jquery) {
  const $ = jquery;

  $.fn.rangeSlider = function (options) {
    let sliderOptions = options;
    sliderOptions = $.extend(
      {
        domParent: this[0],
        ...defaultOptions,
      },
      sliderOptions,
    );

    const slider = new Slider(sliderOptions);
    slider.init();

    return slider;
  };
}(jQuery));
