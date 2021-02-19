class Subscriber {
  public name: string;

  public callbacks: Function[];

  constructor(name: string) {
    this.name = name;
    this.callbacks = [];
  }

  registerCallback = (callback: Function) => {
    this.callbacks.push(callback);
  };
}

export default Subscriber;
