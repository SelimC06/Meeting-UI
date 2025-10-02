"use strict";
var _a;
const electron = require("electron");
console.log("[preload] loaded", (_a = process == null ? void 0 : process.versions) == null ? void 0 : _a.electron);
globalThis.__ELECTRON_PRELOAD_OK__ = true;
electron.contextBridge.exposeInMainWorld("electronAPI", {
  listCaptureSources: async (types = ["screen", "window"]) => {
    try {
      return await electron.ipcRenderer.invoke("list-capture-sources", types);
    } catch (e) {
      console.warn("[preload] listCaptureSources failed:", e);
      return [];
    }
  },
  pickPrimaryScreenId: async () => {
    var _a2;
    const list = await electron.ipcRenderer.invoke("list-capture-sources", ["screen"]);
    return ((_a2 = list[0]) == null ? void 0 : _a2.id) ?? null;
  }
});
