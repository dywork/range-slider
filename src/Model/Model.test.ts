import { Model, IModel } from './Model';

let model: IModel;
beforeEach(() => {
  model = new Model();
});

describe('Model', () => {
  it('Присваивает заданный minValue', () => {
    const minValue = 10;
    model.setMinValue(minValue);
    expect(model.getMinValue()).toBe(minValue);
  });

  it('Присваивает заданный maxValue', () => {
    const maxValue = 50;
    model.setMaxValue(maxValue);
    expect(model.getMaxValue()).toBe(maxValue);
  });

  it('Выдает ошибку если заданный minValue больше текущего maxValue', () => {
    const maxValue = 5;
    const minValue = 115;
    model.setMaxValue(maxValue);
    const func = model.setMinValue.bind(this, minValue);
    expect(func).toThrowError('minValue не может быть > maxValue');
  });
});
