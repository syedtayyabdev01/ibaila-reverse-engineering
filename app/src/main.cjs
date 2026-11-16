const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("node:path");
const { pathToFileURL } = require("node:url");

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 820,
    minWidth: 960,
    minHeight: 640,
    backgroundColor: "#07110d",
    title: "Verdant Audio",
    show: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });
  win.loadFile(path.join(__dirname, "index.html"));
  win.once("ready-to-show", () => win.show());
}

ipcMain.handle("audio:pick", async () => {
  const result = await dialog.showOpenDialog({
    title: "Add music to your library",
    properties: ["openFile", "multiSelections"],
    filters: [
      { name: "Audio", extensions: ["mp3", "wav", "flac", "m4a", "aac", "ogg", "opus"] }
    ]
  });
  if (result.canceled) return [];
  return result.filePaths.map((filePath) => ({
    name: path.basename(filePath, path.extname(filePath)),
    fileName: path.basename(filePath),
    url: pathToFileURL(filePath).href
  }));
});

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
