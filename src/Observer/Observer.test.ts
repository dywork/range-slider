import Observer from './Observer';

describe('Observer', () => {
  it('Добавляет нового наблюдателя', () => {
    const observer = new Observer();
    const observerEvent = () => {
      const message = 'Сообщение из observer.test';
      // eslint-disable-next-line no-console
      console.log(message);
    };
    observer.addObserver(observerEvent);
    expect(observer.getCount()).toBe(1);
  });
});
