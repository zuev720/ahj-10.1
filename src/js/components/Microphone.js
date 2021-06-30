import getTime from '../functions/getTime';
import EventBus from '../patterns/eventBus';
import getCoords from '../functions/getCoords';

export default class Microphone {
  constructor(elem) {
    if (!elem) throw new Error('Не передан елемент');
    if (typeof elem === 'string') this.element = document.querySelector(elem);
    this.element = elem;
    this.media().then((r) => r);
    this.eventListeners();
  }

  eventListeners() {
    this.element.addEventListener('click', (e) => this.onClickMicrophone(e));
  }

  onClickMicrophone(e) {
    if (e.currentTarget.classList.contains('active-microphone')) {
      this.recorder.stop();
      e.currentTarget.classList.remove('active-microphone');
    } else {
      this.recorder.start();
      e.currentTarget.classList.add('active-microphone');
    }
  }

  async media() {
    if (!window.MediaRecorder) return;
    this.stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });
    this.recorder = new MediaRecorder(this.stream);
    this.chunks = [];

    this.recorder.addEventListener('start', () => {
      console.log(this.recorder.state);
    });

    this.recorder.addEventListener('dataavailable', (evt) => {
      this.chunks.push(evt.data);
    });

    this.recorder.addEventListener('stop', async () => {
      const blob = new Blob(this.chunks);
      this.chunks = [];
      const coords = await getCoords();
      if (coords === 'close') return;
      const outputObject = {
        type: 'audio',
        content: blob,
        coords,
        time: getTime(),
      };
      EventBus.publish('new audio recording', outputObject);
    });
  }
}
