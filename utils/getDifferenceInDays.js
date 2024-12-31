export default function differenceInDays(dateLeft, dateRight) {
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const timeDiff = Math.abs(dateLeft.getTime() - dateRight.getTime());
  return Math.round(timeDiff / millisecondsPerDay);
}
