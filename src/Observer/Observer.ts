import Subscriber from './Subscriber';

interface IObserver {
  subscribe(subName: string): void;
  notify(subName: string, data: any): void;
  addEventListener(subName: string, callback: Function): void;
}

interface ISubscribers {
  [index: string]: Subscriber;
}

class Observer implements IObserver {
  private subscribers: ISubscribers;

  constructor() {
    this.subscribers = {};
  }

  subscribe = (subName: string) => {
    const subscriber = new Subscriber(subName);
    this.subscribers[subName] = subscriber;
  };

  notify = (subName: string, data: any) => {
    this.subscribers[subName].callbacks.forEach((callback: Function) => callback(data));
  };

  addEventListener = (subName: string, callback: Function) => {
    this.subscribers[subName].registerCallback(callback);
  };
}

export default Observer;
