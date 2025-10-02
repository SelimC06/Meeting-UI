import { useState } from "react";
import Sidebar from "./components/Sidebar";
import NotesPanel from "./components/NotesPanel";

import { useThreeTrackSegments } from "./hooks/useThreeTrackSegments";
import { uploadCombined } from "./api";
import "./App.css"; // or "./index.css" if that’s your Tailwind entry

export default function App() {
  const [notes, setNotes] = useState(`# Title: Zoom Meeting

# Key Points
- (point)

# Decisions
- (decision)`);

  const { status, record, pause, resume, stop } = useThreeTrackSegments();

  async function handleRecord() {
    if (status === "idle") {
    void record();        // <-- don’t await
    } else if (status === "paused") {
      void resume();
    }
  }

  async function handlePause() {
    if (status !== "recording") return;
    await pause();
  }

  async function handleStop() {
    try {
      const combined = await stop();  // stop() returns only Combined

      console.log("Combined blobs:", {
        screen: combined.screen?.size,
        systemAudio: combined.systemAudio?.size,
        micAudio: combined.micAudio?.size,
      });

      if (!combined.screen && !combined.systemAudio && !combined.micAudio) {
        console.warn("No blobs to upload (no screen/system/mic recorded).");
        return;
      }

      const result = await uploadCombined(combined);
      if (result?.notes) setNotes(result.notes);
    } catch (e) {
      console.error("Stop failed:", e);
    }
  }

  function handleReset() {
    setNotes("");
  }

  // Button states
  const disabled = {
    record: !(status === "idle" || status === "paused"),
    pause:  status !== "recording",
    stop:   status === "idle",
  };

  return (
    <div className="w-full h-full bg-slate-900 p-3">
      <div className="h-full grid gap-3 grid-cols-[clamp(65px,18vw,150px)_1fr]">
        <aside className="h-full bg-slate-800 rounded-2xl p-3">
          <Sidebar
            onRecord={handleRecord}
            onPause={handlePause}
            onStop={handleStop}
            onReset={handleReset}
            disabled={disabled}               // <— pass disabled map
          />
        </aside>

        <section className="h-full bg-slate-100 rounded-2xl p-3 min-w-0 overflow-hidden">
          <NotesPanel value={notes} onChange={setNotes} />
        </section>
      </div>
    </div>
  );
}
