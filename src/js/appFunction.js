const { ipcRenderer } = require('electron')
const ipc = ipcRenderer

const exitBtn = document.getElementById('closeWindow');
const reloadPage = document.getElementById('reload');
const zoomIn = document.getElementById('zoomIn');
const zoomOut = document.getElementById('zoomOut');
const actualSize = document.getElementById('actualSize');


exitBtn.addEventListener('click', () => {
  ipc.send('closeApp')
})

reloadPage.addEventListener('click', () => {
  ipc.send('reloadApp')
})

zoomIn.addEventListener('click', () => {
  ipc.send('isZoomIn')
})

zoomOut.addEventListener('click', () => {
  ipc.send('isZoomOut')
})

actualSize.addEventListener('click', () => {
  ipc.send('isActualSize')
})