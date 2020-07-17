interface ISliderClassName {
  overflowFix: string;
  slider: string;
  wrap: string;
  bar: string;
  scale: string;
  toggle: string;
  toggleActive: string;
  handle: string;
  thumb: string;
  ruler: string;
  rulerItem: string;
  sliderVertical: string;
}

const sliderClassName: ISliderClassName = {
  overflowFix: 'range-slider-overflow',
  slider: 'range-slider',
  sliderVertical: 'range-slider--vertical',
  wrap: 'range-slider__wrap',
  bar: 'range-slider__bar',
  scale: 'range-slider__scale',
  toggle: 'range-slider__toggle',
  toggleActive: 'range-slider__toggle--active',
  handle: 'range-slider__handle',
  thumb: 'range-slider__thumb',
  ruler: 'range-slider__ruler',
  rulerItem: 'range-slider__ruler-item',
};

export default sliderClassName;
