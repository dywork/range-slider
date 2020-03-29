interface IObserver {
  getObservers(): Function[];
  addObserver(observer: Function): void;
  removeObserver(observer: Function): void;
  notifyObservers(data?: Object): void;
}

class Observer implements IObserver {
  private observers: Function[];

  constructor() {
    this.observers = [];
  }

  getObservers = () => this.observers;

  addObserver = (observer: Function) => {
    this.getObservers().push(observer);
  };

  removeObserver = (observer: Function) => {
    const index = this.getObservers().indexOf(observer);
    const isFind = index > -1;

    if (isFind) {
      this.getObservers().splice(index, 1);
    }
  };

  notifyObservers = (data?: Object) => {
    const isHaveObservers = this.getObservers().length > 0;

    if (isHaveObservers) {
      this.getObservers().forEach((observer: Function) => {
        observer(data);
      });
    }
  };
}

export default Observer;
