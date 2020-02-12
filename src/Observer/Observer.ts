class Observer {
  private observerList: Function[];

  constructor() {
    this.observerList = [];
  }

  addObserver = (observer: Function) => {
    this.observerList.push(observer);
  };

  getCount = () => this.observerList.length;
}

export default Observer;
