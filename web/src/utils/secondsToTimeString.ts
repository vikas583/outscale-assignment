export function secondsToTimeString(sec: number) {
  // Hours, minutes and seconds
  const hrs = ~~(sec / 3600);
  const mins = ~~((sec % 3600) / 60);
  const secs = ~~sec % 60;

  // Output like "1h 01m" or "4h 03m 59s" or "123:03:59"
  let ret = "";

  if (hrs > 0) {
    ret += "" + hrs + "h " + (mins < 10 ? "0" : "");
  }

  ret += "" + mins + "m " + (secs < 10 ? "0" : "");
  ret += "" + secs + "s";
  return ret;
}
