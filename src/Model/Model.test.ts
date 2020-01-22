import { Model, IModel } from './Model';

describe('Model', () => {
  it('Возвращает заданый текст', () => {
    const text = 'Привет, мир!';
    const model: IModel = new Model(text);
    expect(model.getText()).toBe(text);
  });

  it('Возвращает заданый min value', () => {
    const minValue = 5;
    const model: IModel = new Model(minValue);
    expect(model.getMinValue()).toBe(minValue);
  });
});
