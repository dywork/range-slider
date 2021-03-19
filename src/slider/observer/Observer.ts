const has = require('has');

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
    if (has(this.subscribers, subName)) {
      this.subscribers[subName].push(callback);
    } else {
      this.subscribers[subName] = [];
      this.subscribers[subName].push(callback);
    }
  };

  notify = (subName: string, data: any) => {
    if (this.subscribers[subName]) {
      this.subscribers[subName].forEach((callback: Subscriber) => callback(data));
    }
  };
}

export default Observer;
