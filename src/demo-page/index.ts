/* eslint-disable func-names */
import Slider from '../slider/Slider';
import ConfigPanel from './config-panel/ConfigPanel';
import './style.scss';
import './demoPage';

declare global {
  interface JQuery {
    configPanel(rangeSlider: Slider): ConfigPanel;
  }
}

(function (jquery) {
  const $ = jquery;

  $.fn.configPanel = function (rangeSlider: Slider) {
    const configPanel = new ConfigPanel(this[0], rangeSlider);
    configPanel.init();

    return configPanel;
  };
}(jQuery));
