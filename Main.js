const { app, BrowserWindow } = require('electron')

function createWindow() {
    const win = new BrowserWindow({
        height: 600,
        width: 800,
        center: true,
        show: true,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false,
        },
    });
    win.maximize();
    win.setTitle('RivaColdSelect');
    win.loadFile('./Index.html');
}

app.whenReady().then(createWindow);