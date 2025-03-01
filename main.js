const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const { generatePDF } = require('./src/services/generate-pdf.js');

let mainWindow;

app.whenReady().then(() => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 450,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'), // ✅ Usa preload.js
            contextIsolation: true,  // ✅ Protezione contro il codice non sicuro
            enableRemoteModule: false,
            nodeIntegration: false
        }
    });

    mainWindow.loadFile(path.join(__dirname, './src/render/index.html'));

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
});

// ✅ Gestione dell'evento IPC
ipcMain.handle('generate-barcode-pdf', async () => {
    try {
        const message = await generatePDF();
        return message;
    } catch (error) {
        return `Errore durante la generazione del PDF: ${error.message}`;
    }
});