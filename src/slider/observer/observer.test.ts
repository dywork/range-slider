import Observer from './Observer';
import SubEvents from '../SubEvents';

let observer: Observer;

beforeEach(() => {
  observer = new Observer();
});

describe('Observer', () => {
  it('подписывает', () => {
    observer = new Observer();
    spyOn(observer, 'subscribe');
    const testSubCallBack = () => {};
    observer.subscribe(SubEvents.testSub, testSubCallBack);
    expect(observer.subscribe).toHaveBeenCalledWith(SubEvents.testSub, testSubCallBack);
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
    observer.subscribe(SubEvents.testSub, testSubCallBack);
    observer.notify(SubEvents.testSub, testData);
    expect(observer.subscribe).toHaveBeenCalledWith(SubEvents.testSub, testSubCallBack);
    expect(observer.notify).toHaveBeenCalledWith(SubEvents.testSub, testData);
  });
});
