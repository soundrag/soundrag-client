const formatTime = (time: number): string => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);

  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

const formatDuration = (currentTime: number, duration: number): string => {
  return `${formatTime(currentTime)} / ${formatTime(duration)}`;
};

const formatDate = (date: string): string => {
  return date.replace("T", " ").slice(0, 19);
};

const formatFileName = (
  fileName: string,
  showFullFileName: boolean,
): string => {
  return fileName.length > 30 && !showFullFileName
    ? `${fileName.substring(0, 30)}...`
    : fileName;
};

export { formatTime, formatDuration, formatDate, formatFileName };