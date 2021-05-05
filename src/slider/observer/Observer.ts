import has from 'has';

type Subscriber = (...args: any[]) => any;
interface ISubscribers {
  [key: string]: Array<Subscriber>;
}

class Observer {
  private subscribers: ISubscribers;

  constructor() {
    this.subscribers = {};
  }

  subscribe = (subName: string, callback: Subscriber) => {
    const hasProp = has(this.subscribers, subName);

    if (hasProp) {
      this.subscribers[subName].push(callback);
    } else {
      this.subscribers[subName] = [callback];
    }
  };

  notify = (subName: string, data: any) => {
    if (this.subscribers[subName]) {
      this.subscribers[subName].forEach((callback: Subscriber) => callback(data));
    }
  };
}

export default Observer;
