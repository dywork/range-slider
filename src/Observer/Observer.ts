class Observer {
  private observerList: Function[];

  constructor() {
    this.observerList = [];
  }

  addObserver = (observer: Function) => {
    this.observerList.push(observer);
  };

  removeObserver = (observer: Function) => {
    const index = this.observerList.indexOf(observer);

    if (index > -1) {
      this.observerList.splice(index, 1);
    }
  };

  getCount = () => this.observerList.length;
}

export default Observer;
