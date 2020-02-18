interface IObserver {
  addObserver(observer: Function): void;
  removeObserver(observer: Function): void;
  getList(): Function[];
  getCount(): Number;
  notifyAll(data?: any): void;
}

class Observer implements IObserver {
  private observerList: Function[] = [];

  getList = () => this.observerList;

  getCount = () => this.getList().length;

  addObserver = (observer: Function) => {
    this.getList().push(observer);
  };

  removeObserver = (observer: Function) => {
    const index = this.getList().indexOf(observer);

    if (index > -1) {
      this.getList().splice(index, 1);
    }
  };

  notifyAll = (data?: any) => {
    if (this.getCount() > 0) {
      this.getList().forEach((observer: Function) => {
        observer(data);
      });
    }
  };
}

export { Observer, IObserver };
