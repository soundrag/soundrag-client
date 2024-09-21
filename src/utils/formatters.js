const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);

  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

const formatSilderValue = (currentTime, duration) => {
  return (currentTime / duration) * 100 || 0;
};

const formatDuration = (currentTime, duration) => {
  return `${formatTime(currentTime)} / ${formatTime(duration)}`;
};

export { formatTime, formatSilderValue, formatDuration };
