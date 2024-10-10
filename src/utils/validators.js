const isEqualPosition = (currentPosition, newPosition) => {
  return (
    currentPosition[0] === newPosition[0] &&
    currentPosition[1] === newPosition[1] &&
    currentPosition[2] === newPosition[2]
  );
};

const isValidatePosition = (position) => {
  return position;
};

const isFiniteNumber = (value) => {
  return typeof value === "number" && isFinite(value);
};

const isValidateNumber = (x, y, z) => {
  return isFiniteNumber(x) && isFiniteNumber(y) && isFiniteNumber(z);
};

const hasCurrentRef = (ref) => {
  return ref.current;
};

export { isEqualPosition, isValidatePosition, isValidateNumber, hasCurrentRef };
