$(document).ready(function () {
  $('#firstSlider').rangeSlider({ currentValue: 15, range: { min: 13, max: 30 }, isThumb: true });

  $('#secondSlider').rangeSlider({
    currentValue: 3,
    range: { min: 3, max: 19 },
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
    step: 5,
    orientation: 'vertical',
  });

  $('#fifthSlider').rangeSlider({
    currentValue: [15, 27],
    range: { min: 13, max: 30 },
    isThumb: true,
  });
});
