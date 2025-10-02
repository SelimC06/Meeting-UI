import { contextBridge, ipcRenderer } from "electron";

console.log("[preload] loaded", process?.versions?.electron);
(globalThis as any).__ELECTRON_PRELOAD_OK__ = true;

contextBridge.exposeInMainWorld("electronAPI", {
  listCaptureSources: async (types: ("screen" | "window")[] = ["screen", "window"]) => {
    try {
      return await ipcRenderer.invoke("list-capture-sources", types);
    } catch (e) {
      console.warn("[preload] listCaptureSources failed:", e);
      return [];
    }
  },
  pickPrimaryScreenId: async () => {
    const list = await ipcRenderer.invoke("list-capture-sources", ["screen"]);
    return list[0]?.id ?? null;
  },
});
