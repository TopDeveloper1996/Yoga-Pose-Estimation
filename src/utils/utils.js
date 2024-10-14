const totalTime = (times = []) => {
  let totalSeconds = 0;

  times?.forEach((time) => {
    const [minutes, seconds] = time.split(":").map(Number);
    totalSeconds += minutes * 60 + seconds;
  });

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;

  if (hours > 0) {
    return [
      hours.toString().padStart(2, "0"),
      minutes.toString().padStart(2, "0"),
      secs.toString().padStart(2, "0"),
    ].join(":");
  } else {
    return [
      minutes.toString().padStart(2, "0"),
      secs.toString().padStart(2, "0"),
    ].join(":");
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  totalTime,
};
