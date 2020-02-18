/* eslint-disable func-names */
import { Model, IModelOptions } from './Model/Model';
import { View } from './View/View';
import Presenter from './Presenter/Presenter';

declare global {
  interface JQuery {
    rangeSlider(options: IModelOptions): void;
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
    const model = new Model(sliderOptions);
    const view = new View(model.getStart(), model.getRange(), model.getCurrentValue());
    const presenter = new Presenter(model, view);
    presenter.init();
  };
}(jQuery));
