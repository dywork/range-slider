import { Model, IModel } from './Model';

let model: IModel;
beforeEach(() => {
  model = new Model();
});

describe('Model', () => {
  it('Возвращает заданный value.min', () => {
    const min = 20;
    const myModel = new Model({ min });
    expect(myModel.getRange().min).toBe(min);
  });

  it('Возвращает заданный value.max', () => {
    const max = 80;
    const myModel = new Model({ max });
    expect(myModel.getRange().max).toBe(max);
  });

  it('Выдает ошибку если заданный minValue больше текущего maxValue', () => {
    const maxValue = 5;
    const minValue = 115;
    model.setMaxValue(maxValue);
    const func = model.setMinValue.bind(this, minValue);
    expect(func).toThrowError('minValue не может быть > maxValue');
  });

  it('Выдает ошибку если заданный maxValue меньше текущего minValue', () => {
    const maxValue = 5;
    const minValue = 99;
    model.setMinValue(minValue);
    const func = model.setMaxValue.bind(this, maxValue);
    expect(func).toThrowError('maxValue не может быть < minValue');
  });
});
