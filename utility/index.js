export const epochTime = (s) => {
  const now = Math.floor(new Date().getTime()/1000.0);
  const time = now - s;
  let seconds = Math.floor(time);
  let minutes = Math.floor(time / (60));
  let hours = Math.floor(time / (60 * 60));
  let days = Math.floor(time / (60 * 60 * 24));
  let months = Math.floor(time / (60 * 60 * 24 * 30));
  let years = Math.floor(time / (60 * 60 * 24 * 30 * 12));
  if (seconds < 60) return seconds + " Sec";
  else if (minutes < 60) return minutes + " Min";
  else if (hours < 24) return hours + " Hrs";
  else if (days < 30) return days + " Days";
  else if (months < 12) return months + " Months";
  else return years + " Years";
}

export const countifier = (num) => {
  let k = num / 1000;
  let m = num / 1000000;
  if (num < 1000) return num;
  else if (k < 1000) return k.toFixed(2) + "k";
  else return m.toFixed(2) + "m";
}