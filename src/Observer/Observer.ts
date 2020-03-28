interface IObserver {
  add(observer: Function): void;
  remove(observer: Function): void;
  notify(data?: Object): void;
}

class Observer implements IObserver {
  private observers: Function[];

  constructor() {
    this.observers = [];
  }
}

export default Observer;
