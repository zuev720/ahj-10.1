export default function checkCoords(coords) {
  const regexp = /[\d,.]/g;
  const arr = coords.toString().match(regexp);
  if (arr === null) return 'error';
  const str = arr.join('');
  const arrayCoords = str.split(',');
  const latitude = arrayCoords[0];
  const longitude = arrayCoords[1];
  const latitudeReg = new RegExp(/^-?([1-8]?[1-9]|[1-9]0)\.\d{1,15}/g);
  const longitudeReg = new RegExp(/^-?(([-+]?)([\d]{1,3})((\.)(\d+))?)/g);
  if (latitudeReg.test(latitude) && longitudeReg.test(longitude)) return `${latitude}, ${longitude}`;
  return 'error';
}
