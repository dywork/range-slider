import Model from './Model';
import { IModel } from './Model';

describe('Model', () => {
  it('Возвращает заданый текст', () => {
    const text = 'Привет, мир!';
    const model: IModel = new Model(text);
    expect(model.getText()).toBe(text);
  });
});
