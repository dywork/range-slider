import Subscriber from './Subscriber';

interface IObserver {
  subscribe(subName: string, callback: Function): void;
  notify(subName: string, data: any): void;
}

interface ISubscribers {
  [index: string]: Subscriber;
}

class Observer implements IObserver {
  private subscribers: ISubscribers;

  constructor() {
    this.subscribers = {};
  }

  subscribe = (subName: string, callback: Function) => {
    const subscriber = new Subscriber(subName);
    subscriber.registerCallback(callback);
    this.subscribers[subName] = subscriber;
  };

  notify = (subName: string, data: any) => {
    this.subscribers[subName].callbacks.forEach((callback: Function) => callback(data));
  };
}

export default Observer;
