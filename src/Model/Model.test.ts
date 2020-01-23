import { Model } from './Model';

describe('Model', () => {
  it('возвращает заданные min и max range value', () => {
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
