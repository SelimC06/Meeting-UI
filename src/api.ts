export const API = "http://127.0.0.1:8000";

export type UploadCombinedArgs = {
  screen?: Blob;        // video.webm (vp8/vp9)
  systemAudio?: Blob;   // audio.webm (opus)
  micAudio?: Blob;      // audio.webm (opus)
};

export async function uploadCombined(blobs: UploadCombinedArgs) {
  const fd = new FormData();
  if (blobs.screen) fd.append("screen", blobs.screen, "screen.webm");
  if (blobs.systemAudio) fd.append("system", blobs.systemAudio, "system.webm");
  if (blobs.micAudio) fd.append("mic", blobs.micAudio, "mic.webm");

  const res = await fetch(`${API}/process`, { method: "POST", body: fd });
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`process failed: ${res.status} ${txt}`);
  }
  return res.json() as Promise<{ notes?: string; video_path?: string }>;
}
