interface IObserver {
  addObserver(observer: Function): void;
  removeObserver(observer: Function): void;
  getList(): Function[];
  getCount(): Number;
  notifyAll(data?: string | number): void;
}

class Observer implements IObserver {
  private observerList: Function[];

  constructor() {
    this.observerList = [];
  }

  addObserver = (observer: Function) => {
    this.getList().push(observer);
  };

  removeObserver = (observer: Function) => {
    const index = this.getList().indexOf(observer);

    if (index > -1) {
      this.getList().splice(index, 1);
    }
  };

  getList = () => this.observerList;

  getCount = () => this.getList().length;

  notifyAll = (data?: string | number) => {
    if (this.getCount() > 0) {
      this.getList().forEach((observer: Function) => {
        observer(data);
      });
    }
  };
}

export { Observer, IObserver };
