/* eslint-disable func-names */
import { Slider, ISliderOptions } from './Slider';

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
        currentValue: 0,
        range: {
          min: 0,
          max: 100,
        },
        isThumb: true,
      },
      sliderOptions,
    );

    const slider = new Slider(sliderOptions);
    slider.init();
  };
}(jQuery));
