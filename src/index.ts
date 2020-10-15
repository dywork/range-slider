/* eslint-disable func-names */
import { Slider, ISliderOptions } from './slider/Slider';
import ConfigPanel from './demo-page/СonfigPanel';
import defaultOptions from './slider/defaultOptions';
import './demo-page/style.scss';
import './demo-page/demoPage';

declare global {
  interface JQuery {
    rangeSlider(options: ISliderOptions): Slider;
    configPanel(rangeSlider: Slider): ConfigPanel;
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
      sliderOptions,
    );

    const slider = new Slider(sliderOptions);
    slider.init();

    return slider;
  };

  $.fn.configPanel = function (rangeSlider: Slider) {
    const configPanel = new ConfigPanel(this[0], rangeSlider);
    configPanel.init();

    return configPanel;
  };
}(jQuery));
