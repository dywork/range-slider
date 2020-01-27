import { Model, IModel } from './Model';

const range = {
  min: 0,
  max: 100,
};

const startPosition = 0;
let model: IModel;
beforeEach(() => {
  model = new Model(startPosition, { min: range.min, max: range.max });
});

describe('Model', () => {
  it('возвращает заданное начальное значение', () => {
    expect(model.getStart()).toBe(startPosition);
  });

  it('возвращает заданные range.min', () => {
    expect(model.getRange().min).toBe(range.min);
  });

  it('возвращает заданные range.max', () => {
    expect(model.getRange().max).toBe(range.max);
  });

  it('сообщает об ошибке если range.min > range.max', () => {
    expect(() => {
      const myModel = new Model(startPosition, { min: range.max, max: range.min });
      return myModel;
    }).toThrowError('range.min не может быть > range.max');
  });
});
