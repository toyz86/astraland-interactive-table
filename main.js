process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = true;

const { app, BrowserWindow, ipcMain} = require('electron/main')
const path = require('node:path');
const ipc = ipcMain;

process.env.NODE_ENV = 'production';

const isDev = process.env.NODE_ENV !== 'production';

function createWindow () {
  const win = new BrowserWindow({
    width: isDev ? 1280 : 800,
    height: isDev ? 720 : 600,
    // frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      nativeWindowOpen: false,
      contextIsolation: false
    },
    title: 'Astraland App'
  })

  win.setMenuBarVisibility(false) // Hide menus bar

  if (isDev) {
    win.webContents.openDevTools();
  }

  win.loadFile('index.html')
  
  ipc.on('closeApp', () => {
    console.log('Received closeApp message')
    win.close()
  })

  ipc.on('reloadApp', () => {
    win.reload()
  })

  ipc.on('isZoomIn', () => {
    console.log('isZoomIn')
    win.webContents.zoomFactor += 0.1;
  })

  ipc.on('isZoomOut', () => {
    console.log('isZoomOut')
    win.webContents.zoomFactor -= 0.1; 
  })

  ipc.on('isActualSize', () => {
    console.log('isActualSize')
    win.webContents.zoomFactor = 1;
  })


  // const menu = Menu.buildFromTemplate([
  //   {
  //     label: 'View',
  //     submenu: [
  //       { role: 'togglefullscreen' },
  //       { type: 'separator' },
  //       { role: 'zoomin' },
  //       { role: 'zoomout' },
  //       { role: 'resetzoom' },
  //       { type: 'separator' },
  //       { role: 'reload', accelerator: 'CmdOrCtrl+R' },
  //       { type: 'separator' },
  //       { role: 'quit', accelerator: 'CmdOrCtrl+Q' }
  //     ]
  //   }
  // ])
  // Menu.setApplicationMenu(menu);

}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
