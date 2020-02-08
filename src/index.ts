/* eslint-disable func-names */
import Presenter from './Presenter/Presenter';
import { IOptions } from './types/options';

declare global {
  interface JQuery {
    rangeSlider(options: IOptions): void;
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
    // Выбранный элемент будет в this, т.е. это уже объект JQuery, а не элемент DOM
    // Код плагина (может быть на JS)
    const presenter = new Presenter(sliderOptions);
    presenter.init();
  };
}(jQuery));
