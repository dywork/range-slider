import { IRange } from '../Model/Model';

class View {
  private range: IRange;

  constructor(range: IRange) {
    this.range = range;
  }

  render = () => {
    const p = document.createElement('p');
    p.textContent = `${this.range.min} --- ${this.range.max}`;
    document.body.appendChild(p);
  };
}

export default View;
