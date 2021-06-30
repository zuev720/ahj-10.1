import Modal from '../components/Modal';
import checkCoords from './checkCoords';

export default async function getCoords() {
  const coords = await new Promise((resolve) => {
    if (!navigator.geolocation) resolve('error');
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      resolve(`${latitude.toFixed(5)}, ${longitude.toFixed(5)}`);
    }, (errorPosition) => resolve(errorPosition.code));
  });
  const result = await coords;

  const final = await new Promise((resolve) => {
    if (result === 1) {
      const modal = new Modal();
      modal.modalOpen();
      modal.element.querySelector('.coords-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const error = modal.element.querySelector('.error');
        if (error) error.remove();
        const text = e.currentTarget.querySelector('#input-coords').value.trim();
        const checkedCoords = checkCoords(text);
        if (checkedCoords === 'error') {
          const errorElem = document.createElement('span');
          errorElem.className = 'error';
          errorElem.textContent = 'Вы ввели неверные координаты, попробуйте еще раз.';
          modal.element.querySelector('.coords-form').insertAdjacentElement('beforebegin', errorElem);
        } else {
          modal.close();
          resolve(checkedCoords);
        }
      });
      modal.element.querySelector('.button-cancel-modal').addEventListener('click', (e) => {
        e.preventDefault();
        modal.close();
        resolve('close');
      });
    } else {
      resolve(coords);
    }
  });
  return final;
}
