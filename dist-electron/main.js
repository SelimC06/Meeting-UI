"use strict";
const electron = require("electron");
const path = require("node:path");
let win = null;
function createWindow() {
  win = new electron.BrowserWindow({
    minWidth: 500,
    minHeight: 400,
    width: 500,
    height: 400,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      // compiled preload (CJS)
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
      // ok to leave true now, but false is fine too
      devTools: true
    }
  });
  electron.Menu.setApplicationMenu(null);
  win.loadURL(process.env.VITE_DEV_SERVER_URL || "http://localhost:5173");
  win.webContents.openDevTools({ mode: "detach" });
}
electron.app.whenReady().then(() => {
  electron.session.defaultSession.setPermissionRequestHandler(
    (_wc, perm, cb) => cb(perm === "media" || perm === "display-capture")
  );
  electron.ipcMain.handle("list-capture-sources", async (_evt, types = ["screen", "window"]) => {
    const sources = await electron.desktopCapturer.getSources({
      types,
      thumbnailSize: { width: 320, height: 180 },
      fetchWindowIcons: false
    });
    return sources.map((s) => ({ id: s.id, name: s.name }));
  });
  createWindow();
});
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") electron.app.quit();
});
electron.app.on("activate", () => {
  if (electron.BrowserWindow.getAllWindows().length === 0) createWindow();
});
