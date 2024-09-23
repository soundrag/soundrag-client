const isFiniteNumber = (value) => {
  return typeof value === "number" && isFinite(value);
};

const isValidatePosition = (x, y, z) => {
  return isFiniteNumber(x) && isFiniteNumber(y) && isFiniteNumber(z);
};

const hasCurrentRef = (ref) => {
  return ref.current;
};

export { isFiniteNumber, isValidatePosition, hasCurrentRef };
