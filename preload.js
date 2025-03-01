const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    generateBarcodePDF: () => ipcRenderer.invoke('generate-barcode-pdf')
});