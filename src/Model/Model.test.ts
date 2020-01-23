import { Model } from './Model';

describe('Model', () => {
  it('возвращает заданное начальное значение', () => {
    const min = 0;
    const max = 100;
    const start = 0;
    const model = new Model(start, { min, max });
    expect(model.getStart()).toBe(start);
  });

  it('возвращает заданные range.min и range.max', () => {
    const min = 0;
    const max = 100;
    const model = new Model({ min, max });
    expect(model.getRange().min).toBe(min);
    expect(model.getRange().max).toBe(max);
  });

  it('сообщает об ошибке если range.min > range.max', () => {
    const min = 100;
    const max = 0;
    expect(() => {
      const model = new Model({ min, max });
      return model;
    }).toThrowError('range.min не может быть > range.max');
  });
});
