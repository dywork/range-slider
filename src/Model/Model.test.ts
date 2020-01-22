import { Model, IModel } from './Model';

describe('Model', () => {
  it('Возвращает заданый min value', () => {
    const minValue = 5;
    const model: IModel = new Model(minValue);
    expect(model.getMinValue()).toBe(minValue);
  });

  it('Возвращает заданый max value', () => {
    const maxValue = 115;
    const model: IModel = new Model(maxValue);
    expect(model.getMaxValue()).toBe(maxValue);
  });
});
