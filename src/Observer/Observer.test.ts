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

  it('Оповещает всех об изменении данных', () => {
    const observerEventOne = jasmine.createSpy('observerEventOne', (data: string) => {
      // eslint-disable-next-line no-console
      console.log(`observer #1 ${data}`);
    });
    const observerEventSecond = jasmine.createSpy('observerEventOne', (data: string) => {
      // eslint-disable-next-line no-console
      console.log(`observer #2 ${data}`);
    });
    observer.addObserver(observerEventOne);
    observer.addObserver(observerEventSecond);
    const newData = 'новые данные';
    observer.notifyAll(newData);
    expect(observerEventOne).toHaveBeenCalledWith(newData);
    expect(observerEventSecond).toHaveBeenCalledWith(newData);
  });
});
