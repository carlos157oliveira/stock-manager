const { app, BrowserWindow, Menu } = require('electron');

let mainWindow = null;
app.on('ready', () => {

  Menu.setApplicationMenu(null);

  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    },
    width: 750
  });

  mainWindow.maximize();
  mainWindow.loadURL('file://' + __dirname + '/app/index.html');

});

// No linux parece que isso não é necessário
app.on('window-all-closed', () => {
  app.quit();
});
