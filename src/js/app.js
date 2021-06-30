import MediaManager from './components/MediaManager';
import Microphone from './components/Microphone';
import Camera from './components/Camera';
import TextArea from './components/TextArea';

const container = document.querySelector('.container');
window.mediaManager = new MediaManager(container);
window.microphone = new Microphone(document.querySelector('.microphone'));
window.camera = new Camera(document.querySelector('.camera'));
window.textarea = new TextArea(document.querySelector('#text-post'));
