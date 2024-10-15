const isEqualVectors = (firstVectors, secondVectors, epsilon = 1e-6) => {
  if (firstVectors.length !== secondVectors.length) return false;

  for (let i = 0; i < firstVectors.length; i++) {
    if (Math.abs(firstVectors[i] - secondVectors[i]) > epsilon) return false;
  }

  return true;
};

const deepEqual = (firstPosition, secondPosition, epsilon = 1e-6) => {
  return (
    isEqualVectors(
      firstPosition.firstSpeaker,
      secondPosition.firstSpeaker,
      epsilon,
    ) &&
    isEqualVectors(
      firstPosition.secondSpeaker,
      secondPosition.secondSpeaker,
      epsilon,
    ) &&
    isEqualVectors(firstPosition.listener, secondPosition.listener, epsilon)
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

export { deepEqual, isValidatePosition, isValidateNumber, hasCurrentRef };
