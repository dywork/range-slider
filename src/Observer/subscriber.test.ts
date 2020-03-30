import Subscriber from './Subscriber';

describe('Subscriber', () => {
  it('создает callback', () => {
    const subscriber = new Subscriber('testSub');
    spyOn(subscriber, 'registerCallback');
    const testCallBack = () => {};
    subscriber.registerCallback(testCallBack);
    expect(subscriber.registerCallback).toHaveBeenCalledWith(testCallBack);
  });
});
