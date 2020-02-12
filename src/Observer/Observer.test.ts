import { Observer, IObserver } from './Observer';

let observer: IObserver;
beforeEach(() => {
  observer = new Observer();
});

describe('Observer', () => {
  it('Добавляет нового наблюдателя', () => {
    const observerEvent = () => {
      const message = 'Сообщение из observer.test';
      // eslint-disable-next-line no-console
      console.log(message);
    };
    observer.addObserver(observerEvent);
    expect(observer.getCount()).toBe(1);
  });

  it('Удаляет конкретный observer', () => {
    const observerEventOne = () => {
      const message = 'Сообщение из observer.test №1';
      // eslint-disable-next-line no-console
      console.log(message);
    };
    const observerEventSecond = () => {
      const message = 'Сообщение из observer.test №2';
      // eslint-disable-next-line no-console
      console.log(message);
    };
    observer.addObserver(observerEventOne);
    observer.addObserver(observerEventSecond);
    expect(observer.getCount()).toBe(2);
    observer.removeObserver(observerEventOne);
    expect(observer.getCount()).toBe(1);
    expect(observer.getList()[0]).toBe(observerEventSecond);
  });
});
