import CurrentValues from '../../../types';

interface IScaleProps {
  currentValues: CurrentValues;
  range: { min: number; max: number };
  isVertical: boolean;
}

export default IScaleProps;
