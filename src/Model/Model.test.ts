import { Model, IModel } from './Model';

const min = 0;
const max = 100;
const start = 0;
let model: IModel;
beforeEach(() => {
  model = new Model(start, { min, max });
});

describe('Model', () => {
  it('возвращает заданное начальное значение', () => {
    expect(model.getStart()).toBe(start);
  });

  it('возвращает заданные range.min и range.max', () => {
    expect(model.getRange().min).toBe(min);
    expect(model.getRange().max).toBe(max);
  });

  it('сообщает об ошибке если range.min > range.max', () => {
    expect(() => {
      const myModel = new Model(start, { min: max, max: min });
      return myModel;
    }).toThrowError('range.min не может быть > range.max');
  });
});
