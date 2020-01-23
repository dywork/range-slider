import { Model, IModel } from './Model';

describe('Model', () => {
  it('возвращает заданные min и max range value', () => {
    const model: IModel = new Model({ min: 0, max: 100 });
    expect(model.getRange().min).toBe(0);
    expect(model.getRange().max).toBe(100);
  });
});
