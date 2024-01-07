export const msToTime = (ms: number) => {
  // Pad to 2 or 3 digits, default is 2
  var pad = (n: number, z = 2) => ("00" + n).slice(-z);
  return (
    pad((ms / 3.6e6) | 0) +
    ":" +
    pad(((ms % 3.6e6) / 6e4) | 0) +
    ":" +
    pad(((ms % 6e4) / 1000) | 0)
  );
};
