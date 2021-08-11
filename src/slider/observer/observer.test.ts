import Observer from './Observer';
import SubEvents from '../SubEvents';

let observer: Observer;

beforeEach(() => {
  observer = new Observer();
});

describe('Observer', () => {
  it('подписывает', () => {
    observer = new Observer();
    const testSubCallBack = jest.fn();
    observer.subscribe(SubEvents.testSub, testSubCallBack);
    expect(testSubCallBack.mock.calls.length).toBe(0);
  });

  it('оповещает', () => {
    observer = new Observer();
    const testData = { text: 'hello from test' };
    const testSubCallBack = jest.fn();
    observer.subscribe(SubEvents.testSub, testSubCallBack);
    observer.notify(SubEvents.testSub, testData);
    expect(testSubCallBack.mock.calls.length).toBe(1);
  });
});
