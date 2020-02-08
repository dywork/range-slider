export interface IRange {
  min: number;
  max: number;
}

export interface IOptions {
  start: number;
  currentValue: number;
  range: IRange;
}
