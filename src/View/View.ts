interface IViewOptions {
  currentValue: number;
  minValue: number;
  maxValue: number;
}

class View {
  private viewOptions: IViewOptions;

  constructor(viewOptions: IViewOptions) {
    this.viewOptions = viewOptions;
  }
}

export default View;
