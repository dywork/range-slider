import './favicons/favicons.js';

$(document).ready(function () {
  const defaultSlider = $('.js-default-slider').rangeSlider({
    currentValue: 15,
    range: { min: 10, max: 30 },
    isRuler: true,
    isThumb: true,
  });

  const rangeSlider = $('.js-range-slider').rangeSlider({
    currentValue: [15, 25],
    range: { min: 10, max: 30 },
    isRuler: true,
    isThumb: true,
  });

  const stepSlider = $('.js-step-slider').rangeSlider({
    currentValue: 10,
    range: { min: 10, max: 30 },
    step: 5,
    isRuler: true,
    isThumb: true,
  });

  const verticalSlider = $('.js-vertical-slider').rangeSlider({
    currentValue: 15,
    range: { min: 10, max: 30 },
    isRuler: true,
    isThumb: true,
    orientation: 'vertical',
  });

  $('.js-default-slider-config').configPanel(defaultSlider);
  $('.js-range-slider-config').configPanel(rangeSlider);
  $('.js-step-slider-config').configPanel(stepSlider);
  $('.js-vertical-slider-config').configPanel(verticalSlider);
});
