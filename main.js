process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = true;

const { app, BrowserWindow} = require('electron/main')
const path = require('node:path');

process.env.NODE_ENV = 'production';

const isDev = process.env.NODE_ENV !== 'production';

function createWindow () {
  const win = new BrowserWindow({
    width: isDev ? 1000 : 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nativeWindowOpen: false,
    },
    title: 'Astraland App'
  })

  win.setMenuBarVisibility(false)

  if (isDev) {
    win.webContents.openDevTools();
  }

  win.loadFile('index.html')

  // const menu = Menu.buildFromTemplate([
  //   {
  //     label: 'Menu',
  //     submenu: [
  //       {label: 'Reload'},
  //       {label: 'Zoom In'},
  //       {label: 'Zoom Out'},
  //       {label: 'Actual Size'},
  //       {label: 'Exit'}
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
