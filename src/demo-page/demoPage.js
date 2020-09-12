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

  $('#defaultSliderConfig').configPanel(defaultSlider);
  $('#rangeSliderConfig').configPanel(rangeSlider);
});
