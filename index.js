const { app, BrowserWindow } = require('electron')
const electronBrowserWindow = require('electron').BrowserWindow;
const electronIpcMain = require('electron').ipcMain;
const path = require('node:path')

let window;

function createWindow() {
    const window = new BrowserWindow({
        width: 800,
        height: 600,
        frame: false,
        webPreferences: {
            contextIsolation: true, // protect against prototype pollution
            enableRemoteModule: false, // turn off remote
            webviewTag: true,
            contextBridge: true,
            preload: path.join(__dirname, 'preload.js')
        }
    })

    window.loadFile('index.html')
    window.webContents.openDevTools()

    return window;
}
app.whenReady().then(() => {
    window = createWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) window = createWindow();
    })
})
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

electronIpcMain.on('window:minimize', () => {
    window.minimize();
})

electronIpcMain.on('window:maximize', () => {
    window.maximize();
})

electronIpcMain.on('window:restore', () => {
    window.unmaximize();
})

electronIpcMain.on('window:close', () => {
    window.close();
})