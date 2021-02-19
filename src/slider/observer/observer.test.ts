import Observer from './Observer';

let observer: Observer;

beforeEach(() => {
  observer = new Observer();
});

describe('Observer', () => {
  it('подписывает', () => {
    observer = new Observer();
    spyOn(observer, 'subscribe');
    const testSubCallBack = () => {};
    observer.subscribe('testSub', testSubCallBack);
    expect(observer.subscribe).toHaveBeenCalledWith('testSub', testSubCallBack);
  });

  it('оповещает', () => {
    observer = new Observer();
    const testData = { text: 'hello from test' };
    const testSubCallBack = jasmine.createSpy('testSubCallBack', (data: Object) => {
      // eslint-disable-next-line no-console
      console.log(data);
    });
    spyOn(observer, 'subscribe');
    spyOn(observer, 'notify');
    observer.subscribe('testSub', testSubCallBack);
    observer.notify('testSub', testData);
    expect(observer.subscribe).toHaveBeenCalledWith('testSub', testSubCallBack);
    expect(observer.notify).toHaveBeenCalledWith('testSub', testData);
  });
});
