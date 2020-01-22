import { Model, IModel } from './Model';

describe('Model', () => {
  it('Возвращает заданый min value', () => {
    const minValue = 5;
    const maxValue = 115;
    const model: IModel = new Model(minValue, maxValue);
    expect(model.getMinValue()).toBe(minValue);
  });

  it('Возвращает заданый max value', () => {
    const minValue = 5;
    const maxValue = 115;
    const model: IModel = new Model(minValue, maxValue);
    expect(model.getMaxValue()).toBe(maxValue);
  });
});
