interface IObserver {
  getObservers(): Function[];
  add(observer: Function): void;
  remove(observer: Function): void;
  notify(data?: Object): void;
}

class Observer implements IObserver {
  private observers: Function[];

  constructor() {
    this.observers = [];
  }

  getObservers = () => this.observers;

  add = (observer: Function) => {
    this.getObservers().push(observer);
  };

  remove = (observer: Function) => {
    const index = this.getObservers().indexOf(observer);
    const isFind = index > -1;

    if (isFind) {
      this.getObservers().splice(index, 1);
    }
  };

  notify = (data?: Object) => {
    const isHaveObservers = this.getObservers().length > 0;

    if (isHaveObservers) {
      this.getObservers().forEach((observer: Function) => {
        observer(data);
      });
    }
  };
}

export default Observer;
