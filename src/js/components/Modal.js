export default class Modal {
  constructor() {
    this.element = document.createElement('aside');
    this.element.className = 'modal';
    this.getModal();
  }

  modalOpen() {
    this.element.style.left = `${Math.round(document.documentElement.clientWidth / 2 - this.element.offsetWidth / 2)}px`;
    this.element.style.top = `${Math.round(document.documentElement.clientHeight / 2 - this.element.offsetHeight / 2)}px`;
  }

  getModal() {
    document.documentElement.append(this.element);
    this.element.innerHTML = `<p>Что-то пошло не так</p>
        <p>К сожалению нам не удалось определить ваше местоположение. Пожалуйста дайте согласие на использование геолокации, либо введите координаты вручную.</p>
        <p>Широта и долгота через запятую</p>
        <form class="coords-form">
        <label for="input-coords"></label>
        <input id="input-coords" type="text" name="coords" required>
        <div class="wrapper-buttons-modal">
        <button type="button" class="button-cancel-modal">Отмена</button>
        <button type="submit" class="button-add-coords-modal">Ok</button>
        </div>
        </form>`;
  }

  close() {
    this.element.remove();
  }
}
