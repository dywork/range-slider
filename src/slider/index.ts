/* eslint-disable func-names */
import Slider from './Slider';
import defaultOptions from './defaultOptions';
import ISliderOptions from './interfaces/ISliderOptions';
import IModelOptions from './interfaces/IModelOptions';

declare global {
  interface JQuery {
    rangeSlider(options: ISliderOptions): Slider;
  }
}

(function (jquery) {
  const $ = jquery;

  $.fn.rangeSlider = function (options: IModelOptions) {
    let sliderOptions = options;
    sliderOptions = $.extend(
      {
        domParent: this[0],
        ...defaultOptions,
      },
      sliderOptions,
    );

    const slider = new Slider(sliderOptions as ISliderOptions);
    slider.init();

    return slider;
  };
}(jQuery));
