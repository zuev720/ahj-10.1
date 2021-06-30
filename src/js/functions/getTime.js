export default function getTime() {
  const now = new Date();
  const day = (now.getDate() < 10) ? `0${now.getDate()}` : now.getDate();
  const month = ((now.getMonth() + 1) < 10) ? `0${now.getMonth() + 1}` : now.getMonth() + 1;
  const hour = (now.getHours() < 10) ? `0${now.getHours()}` : now.getHours();
  const minute = (now.getMinutes() < 10) ? `0${now.getMinutes()}` : now.getMinutes();
  const year = now.getFullYear().toString().slice(2);
  return `${day}.${month}.${year} ${hour}:${minute}`;
}
