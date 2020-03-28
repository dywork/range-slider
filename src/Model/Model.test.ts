import { Model, IModel } from './Model';

const range = {
  min: 0,
  max: 100,
};

const startPosition = 15;
const currentValue = 20;
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
  it('возвращает заданный объект options', () => {
    expect(model.getOptions()).toBe(options);
  });

  it('возвращает заданное начальное значение', () => {
    expect(model.getOptions().start).toBe(startPosition);
  });

  it('возвращает заданные range.min', () => {
    expect(model.getOptions().range.min).toBe(range.min);
  });

  it('возвращает заданные range.max', () => {
    expect(model.getOptions().range.max).toBe(range.max);
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

  it('возвращает заданный currentValue', () => {
    expect(model.getOptions().currentValue).toBe(currentValue);
  });
});
