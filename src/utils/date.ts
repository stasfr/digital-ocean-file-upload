export function getUnixDate(date: Date | undefined = new Date()) {
  return Math.floor(date.getTime() / 1000);
}
