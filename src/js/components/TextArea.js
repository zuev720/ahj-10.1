import getTime from '../functions/getTime';
import EventBus from '../patterns/eventBus';
import getCoords from '../functions/getCoords';

export default class TextArea {
  constructor(elem) {
    if (!elem) throw new Error('Не передан елемент');
    if (typeof elem === 'string') this.element = document.querySelector(elem);
    this.element = elem;
    this.element.addEventListener('keydown', (e) => TextArea.onClickTextArea(e));
  }

  static async onClickTextArea(e) {
    if (e.code === 'Enter') {
      e.preventDefault();
      if (e.target.value === '') return;
      const coords = await getCoords();
      if (coords === 'close') {
        e.target.value = '';
        return;
      }
      const outputObject = {
        type: 'text',
        content: e.target.value.trim(),
        coords,
        time: getTime(),
      };
      e.target.value = '';
      EventBus.publish('new text post', outputObject);
    }
  }
}
