import Subscriber from './Subscriber';

interface ISubscribers {
  [index: string]: Subscriber;
}

class Observer {
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
    if (this.subscribers[subName]) {
      this.subscribers[subName].callbacks.forEach((callback: Function) => callback(data));
    }
  };
}

export default Observer;
