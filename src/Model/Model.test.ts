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
});
