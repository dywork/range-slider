import { Model, IModel } from './Model';

const range = {
  min: 0,
  max: 100,
};

const startPosition = 0;
const currentValue = 0;
const options = {
  start: startPosition,
  range,
  currentValue,
};

let model: IModel;
beforeEach(() => {
  model = new Model(options);
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
      const myOptions = {
        start: startPosition,
        range: { min: range.max, max: range.min },
        currentValue,
      };
      const myModel = new Model(myOptions);
      return myModel;
    }).toThrowError('range.min не может быть > range.max');
  });
});
