import Observer from './Observer';

describe('Observer', () => {
  it('подписывает', () => {
    const observer = new Observer();
    spyOn(observer, 'subscribe');
    const testSubCallBack = () => {};
    observer.subscribe('testSub', testSubCallBack);
    expect(observer.subscribe).toHaveBeenCalledWith('testSub', testSubCallBack);
  });
});
