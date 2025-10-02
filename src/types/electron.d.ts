// src/types/electron.d.ts
export {};

declare global {
  interface Window {
    electronAPI?: {
      listCaptureSources: (types?: ("screen" | "window")[]) => Promise<{id: string; name: string}[]>;
      pickPrimaryScreenId: () => Promise<string | null>;
    };
  }
}
