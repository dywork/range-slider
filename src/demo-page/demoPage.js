$(document).ready(function () {
  $('#firstSlider').rangeSlider({
    currentValue: 15,
    range: { min: 10, max: 30 },
    isRuler: true,
    isThumb: true,
  });

  $('#secondSlider').rangeSlider({
    currentValue: 3,
    range: { min: 3, max: 19 },
    isRuler: true,
    isThumb: true,
    step: 5,
  });

  $('#thirdSlider').rangeSlider({
    currentValue: 15,
    range: { min: 13, max: 30 },
    isThumb: true,
    orientation: 'vertical',
  });

  $('#fourthSlider').rangeSlider({
    currentValue: 3,
    range: { min: 3, max: 19 },
    isThumb: true,
    isRuler: true,
    step: 5,
    orientation: 'vertical',
  });

  $('#fifthSlider').rangeSlider({
    currentValue: [15, 27],
    range: { min: 13, max: 30 },
    isThumb: true,
  });

  $('#sixthSlider').rangeSlider({
    currentValue: [15, 27],
    range: { min: 13, max: 30 },
    step: 5,
    isThumb: true,
  });

  $('#seventhSlider').rangeSlider({
    currentValue: [15, 27],
    range: { min: 13, max: 30 },
    isThumb: true,
    orientation: 'vertical',
  });

  $('#eighthSlider').rangeSlider({
    currentValue: [15, 27],
    range: { min: 13, max: 30 },
    step: 5,
    isThumb: true,
    orientation: 'vertical',
  });
});
