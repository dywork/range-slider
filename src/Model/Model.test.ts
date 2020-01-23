import { Model } from './Model';

describe('Model', () => {
  it('возвращает заданные min и max range value', () => {
    const min = 0;
    const max = 100;
    const model = new Model({ min, max });
    expect(model.getRange().min).toBe(min);
    expect(model.getRange().max).toBe(max);
  });
});
