$(document).ready(function () {
  const defaultSlider = $('#defaultSlider').rangeSlider({
    currentValue: 15,
    range: { min: 10, max: 30 },
    isRuler: true,
    isThumb: true,
  });

  const rangeSlider = $('#rangeSlider').rangeSlider({
    currentValue: [15, 25],
    range: { min: 10, max: 30 },
    isRuler: true,
    isThumb: true,
  });

  const stepSlider = $('#stepSlider').rangeSlider({
    currentValue: 10,
    range: { min: 10, max: 30 },
    step: 5,
    isRuler: true,
    isThumb: true,
  });

  const verticalSlider = $('#verticalSlider').rangeSlider({
    currentValue: 15,
    range: { min: 10, max: 30 },
    isRuler: true,
    isThumb: true,
    orientation: 'vertical',
  });

  $('#defaultSliderConfig').configPanel(defaultSlider);
  $('#rangeSliderConfig').configPanel(rangeSlider);
  $('#stepSliderConfig').configPanel(stepSlider);
  $('#verticalSliderConfig').configPanel(verticalSlider);
});
