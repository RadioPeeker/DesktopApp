const { app, autoUpdater, dialog, BrowserWindow, screen } = require('electron');
const path = require('path');
const client = require('discord-rich-presence')('778556072981561395');

if (require('electron-squirrel-startup')) { 
  app.quit();
}

const createWindow = () => {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize
  win = new BrowserWindow({
      width: width - 100,
      height: height - 100,
      webPreferences: {
          nodeIntegration: true
      },
      frame: false
  })
  win.removeMenu()
  win.loadURL("https://radiopeeker.com")
  win.webContents.on('did-finish-load', function() {
    win.webContents.insertCSS('html, body {-webkit-user-select: none;}.toggleColour {-webkit-app-region: drag} ::-webkit-scrollbar {display: none;}')
 });
};

const ready = () => {
  client.updatePresence({
    state: 'Browsing the Radios...',
    startTimestamp: Date.now(),
    largeImageKey: 'logo2',
    instance: true,
  });
  createWindow()
}

app.on('ready', ready);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

