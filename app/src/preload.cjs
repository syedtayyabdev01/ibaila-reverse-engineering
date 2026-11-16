const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("verdant", {
  pickAudio: () => ipcRenderer.invoke("audio:pick"),
  openService: (serviceId) => ipcRenderer.invoke("service:open", serviceId)
});
