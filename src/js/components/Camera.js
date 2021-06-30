import getTime from '../functions/getTime';
import EventBus from '../patterns/eventBus';
import getCoords from '../functions/getCoords';

export default class Camera {
  constructor(elem) {
    if (!elem) throw new Error('Не передан елемент');
    if (typeof elem === 'string') this.element = document.querySelector(elem);
    this.element = elem;

    this.media().then((r) => r);
    this.eventListeners();
  }

  eventListeners() {
    this.element.addEventListener('click', (e) => this.onClickCamera(e));
  }

  onClickCamera(e) {
    if (e.currentTarget.classList.contains('active-camera')) {
      this.recorder.stop();
      e.currentTarget.classList.remove('active-camera');
    } else {
      this.recorder.start();
      e.currentTarget.classList.add('active-camera');
    }
  }

  async media() {
    if (!window.MediaRecorder) return;
    this.stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    this.recorder = new MediaRecorder(this.stream);
    this.chunks = [];

    this.recorder.addEventListener('start', () => {
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
        type: 'video',
        content: btoa(blob),
        coords,
        time: getTime(),
      };
      EventBus.publish('new video recording', outputObject);
    });
  }
}
