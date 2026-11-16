const { app, BrowserWindow, ipcMain, dialog, shell } = require("electron");
const path = require("node:path");
const { pathToFileURL } = require("node:url");

function createWindow() {
  const win = new BrowserWindow({
    width: 1600,
    height: 900,
    minWidth: 1050,
    minHeight: 700,
    backgroundColor: "#06110f",
    autoHideMenuBar: true,
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

const SERVICE_URLS = Object.freeze({
  spotify: "https://open.spotify.com/",
  youtubeMusic: "https://music.youtube.com/",
  appleMusic: "https://music.apple.com/",
  googleDrive: "https://drive.google.com/",
  oneDrive: "https://onedrive.live.com/"
});
ipcMain.handle("service:open", async (_event, serviceId) => {
  const url = SERVICE_URLS[serviceId];
  if (!url) throw new Error("Unsupported music service");
  await shell.openExternal(url);
  return { opened: true, serviceId };
});
