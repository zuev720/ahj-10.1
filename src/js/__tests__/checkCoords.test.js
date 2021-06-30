import checkCoords from '../functions/checkCoords';

test('Функция должна возвращать корректные значения', () => {
  expect(checkCoords('55.96446, 43.06431')).toEqual('55.96446, 43.06431');
  expect(checkCoords('[55.96446, 43.06431]')).toEqual('55.96446, 43.06431');
  expect(checkCoords('55.96446,-43.06431')).toEqual('55.96446, 43.06431');
  expect(checkCoords('55.96446, -43.06431')).toEqual('55.96446, 43.06431');
  expect(checkCoords('5596446-4306431')).toEqual('error');
  expect(checkCoords('')).toEqual('error');
});
