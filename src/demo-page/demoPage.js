$(document).ready(function () {
  const defaultSlider = $('#defaultSlider').rangeSlider({
    currentValue: 15,
    range: { min: 10, max: 30 },
    isRuler: true,
    isThumb: true,
  });

  $('#defaultSliderConfig').configPanel(defaultSlider);
});
