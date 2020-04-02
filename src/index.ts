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
    sliderOptions = $.extend(
      {
        currentValue: 0,
        range: {
          min: 0,
          max: 100,
        },
      },
      sliderOptions,
    );

    const domParent = this[0];
    const slider = new Slider(domParent, sliderOptions);
    slider.init();
  };
}(jQuery));
