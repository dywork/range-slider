import CurrentValues from '../../../types';

interface IBarProps {
  currentValues: CurrentValues;
  range: { min: number; max: number };
  isVertical: boolean;
}

export default IBarProps;
