interface ISubscribers {
  [index: string]: Function[];
}

class Observer {
  private subscribers: ISubscribers;

  constructor() {
    this.subscribers = {};
  }

  subscribe = (subName: string, callback: Function) => {
    if (this.subscribers[subName]) {
      this.subscribers[subName].push(callback);
    } else {
      this.subscribers[subName] = [];
      this.subscribers[subName].push(callback);
    }
  };

  notify = (subName: string, data: any) => {
    if (this.subscribers[subName]) {
      this.subscribers[subName].forEach((callback: Function) => callback(data));
    }
  };
}

export default Observer;
