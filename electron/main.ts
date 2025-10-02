import { app, BrowserWindow, session, Menu, ipcMain, desktopCapturer } from "electron";
import path from "node:path";

let win: BrowserWindow | null = null;

function createWindow() {
  win = new BrowserWindow({
    minWidth: 500,
    minHeight: 400,
    width: 500,
    height: 400,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"), // compiled preload (CJS)
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,        // ok to leave true now, but false is fine too
      devTools: true,
    },
  });

  Menu.setApplicationMenu(null);
  win.loadURL(process.env.VITE_DEV_SERVER_URL || "http://localhost:5173");
  win.webContents.openDevTools({ mode: "detach" });
}

app.whenReady().then(() => {
  // Permissions for capture
  session.defaultSession.setPermissionRequestHandler((_wc, perm, cb) =>
    cb(perm === "media" || perm === "display-capture")
  );

  // 👇 IPC: list capture sources in MAIN (not preload)
  ipcMain.handle("list-capture-sources", async (_evt, types: ("screen"|"window")[] = ["screen","window"]) => {
    const sources = await desktopCapturer.getSources({
      types,
      thumbnailSize: { width: 320, height: 180 },
      fetchWindowIcons: false,
    });
    return sources.map(s => ({ id: s.id, name: s.name }));
  });

  createWindow();
});

app.on("window-all-closed", () => { if (process.platform !== "darwin") app.quit(); });
app.on("activate", () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
