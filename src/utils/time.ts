export function getTimeRemaining(endtime: Date | string) {
  const total = new Date(endtime).getTime() - new Date().getTime();
  if (total < 0) return "Expired";
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  let str = "";
  if (days) str += `${days}d,`;
  if (hours) str += `${hours}h,`;
  if (minutes) str += `${minutes}m,`;
  str += `${seconds}s`;
  return str;
}
