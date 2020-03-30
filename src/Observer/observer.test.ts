import Observer from './Observer';

describe('Observer', () => {
  it('подписывает', () => {
    const observer = new Observer();
    spyOn(observer, 'subscribe');
    const testSubCallBack = () => {};
    observer.subscribe('testSub', testSubCallBack);
    expect(observer.subscribe).toHaveBeenCalledWith('testSub', testSubCallBack);
  });

  it('оповещает', () => {
    const observer = new Observer();
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
