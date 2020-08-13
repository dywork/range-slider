import { Slider, ISliderOptions } from '../slider/Slider';
import defaultOptions from '../slider/defaultOptions';
import './style.scss';

declare global {
  interface JQuery {
    rangeSlider(options: ISliderOptions): void;
  }
}

(function (jquery) {
  const $ = jquery;

  $.fn.rangeSlider = function (options: ISliderOptions) {
    let sliderOptions = options;
    sliderOptions = $.extend(
      {
        domParent: this[0],
        ...defaultOptions,
      },
      sliderOptions
    );

    const slider = new Slider(sliderOptions);
    slider.init();

    return slider;
  };
})(jQuery);

import './demoPage';
