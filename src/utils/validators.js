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

export { isValidatePosition, isValidateNumber, hasCurrentRef };
