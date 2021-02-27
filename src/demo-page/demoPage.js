import './favicons/favicons';

/* eslint-disable */
$(document).ready(function () {
  const defaultSlider = $('.js-default-slider').rangeSlider({
    currentValues: [15],
    range: { min: 10, max: 30 },
    withRuler: true,
    withThumb: true,
  });

  const rangeSlider = $('.js-range-slider').rangeSlider({
    currentValues: [15, 25],
    range: { min: 10, max: 30 },
    withRuler: true,
    withThumb: true,
  });

  const stepSlider = $('.js-step-slider').rangeSlider({
    currentValues: [10],
    range: { min: 10, max: 30 },
    step: 5,
    withRuler: true,
    withThumb: true,
  });

  const verticalSlider = $('.js-vertical-slider').rangeSlider({
    currentValues: [15],
    range: { min: 10, max: 30 },
    withRuler: true,
    withThumb: true,
    orientation: 'vertical',
  });

  $('.js-default-slider-config').configPanel(defaultSlider);
  $('.js-range-slider-config').configPanel(rangeSlider);
  $('.js-step-slider-config').configPanel(stepSlider);
  $('.js-vertical-slider-config').configPanel(verticalSlider);
});
