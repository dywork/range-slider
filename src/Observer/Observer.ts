class Observer {
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
}

export default Observer;
