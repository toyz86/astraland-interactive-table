const { ipcRenderer } = require('electron')
const ipc = ipcRenderer

const exitBtn = document.getElementById('closeWindow');
const closeBar = document.querySelector('.exit');

exitBtn.addEventListener('click', () => {
  ipc.send('closeApp')
})

closeBar.addEventListener('click', () => {
  ipc.send('closeApp')
})