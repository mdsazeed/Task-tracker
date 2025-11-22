// main.js - Electron Main Process
const { app, BrowserWindow, screen, ipcMain } = require('electron');
const path = require('path');

function createWindow() {
  const { width } = screen.getPrimaryDisplay().workAreaSize;

  const win = new BrowserWindow({
    width: 300,
    height: 300,
    x: width - 320, // Slight offset from right edge
    y: 200,          // Slight offset from top (below taskbar)
    alwaysOnTop: true,
    frame: false,
    transparent: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    },
  });

  // Load the UI from the correct renderer port
  win.loadURL('http://bgl-ads-230:4445');
  win.once('ready-to-show', () => {
  win.setAlwaysOnTop(true, 'screen-saver'); // top-level mode
  });
  // Handle window control events
  ipcMain.on('minimize-window', () => win.minimize());
  ipcMain.on('close-window', () => win.close());
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
