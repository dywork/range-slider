/* eslint-disable func-names */
import Slider from './slider/Slider';
import defaultOptions from './slider/defaultOptions';
import ISliderOptions from './slider/interfaces/ISliderOptions';
import IModelOptions from './slider/interfaces/IModelOptions';
import ConfigPanel from './demo-page/config-panel/ConfigPanelNew';
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

  $.fn.configPanel = function (rangeSlider: Slider) {
    const configPanel = new ConfigPanel(this[0], rangeSlider);
    configPanel.init();

    return configPanel;
  };
}(jQuery));
