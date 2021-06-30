import EventBus from '../patterns/eventBus';

export default class MediaManager {
  constructor(elem) {
    if (!elem) throw new Error('Не передан елемент');
    if (typeof elem === 'string') this.container = document.querySelector(elem);
    this.container = elem;
    this.createPostBlock = this.container.querySelector('.create-posts-block');
    this.container.style.height = `${document.documentElement.clientHeight}px`;
    this.storage = [];
    this.showPosts();
    this.registerEvents();
  }

  registerEvents() {
    EventBus.subscribe('new audio recording', this.addPost.bind(this));
    EventBus.subscribe('new video recording', this.addPost.bind(this));
    EventBus.subscribe('new text post', this.addPost.bind(this));
  }

  addPost(object) {
    this.storage.push(object);
    this.showPosts();
  }

  showPosts() {
    const postContainer = this.container.querySelector('.post-container');
    postContainer.style.maxHeight = `${this.container.clientHeight - this.createPostBlock.clientHeight}px`;
    postContainer.innerHTML = '';
    this.storage.forEach((element) => {
      const postWrapper = document.createElement('div');
      postWrapper.className = 'post-wrapper';
      if (element.type === 'audio') postWrapper.append(MediaManager.audioPostCreated(element.content));
      if (element.type === 'video') postWrapper.append(MediaManager.videoPostCreated(element.content));
      if (element.type === 'text') postWrapper.append(MediaManager.textPostCreated(element.content));
      const time = document.createElement('span');
      time.className = 'time';
      time.textContent = element.time;
      postWrapper.append(time);
      const coords = document.createElement('span');
      coords.className = 'coords';
      coords.textContent = element.coords;
      postWrapper.append(coords);
      postContainer.insertAdjacentElement('afterbegin', postWrapper);
    });
  }

  static audioPostCreated(blob) {
    const audio = document.createElement('audio');
    audio.className = 'audio-post';
    audio.src = URL.createObjectURL(blob);
    audio.setAttribute('controls', true);
    return audio;
  }

  static videoPostCreated(blob) {
    const video = document.createElement('video');
    video.className = 'video-post';
    video.src = URL.createObjectURL(blob);
    video.setAttribute('controls', true);
    return video;
  }

  static textPostCreated(text) {
    const textElement = document.createElement('p');
    textElement.className = 'text-post';
    textElement.textContent = text;
    return textElement;
  }
}
