import { Model, IModel } from './Model';

let model: IModel;
beforeEach(() => {
  const minValue = 5;
  const maxValue = 115;
  model = new Model(minValue, maxValue);
});

describe('Model', () => {
  it('Возвращает заданый min value', () => {
    const minValue = 5;
    expect(model.getMinValue()).toBe(minValue);
  });

  it('Возвращает заданый max value', () => {
    const maxValue = 115;
    expect(model.getMaxValue()).toBe(maxValue);
  });
});
