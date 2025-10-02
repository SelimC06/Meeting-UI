import ControlButton from "./ui/ControlButton";
import PauseIcon from "../assets/pause_image.png";
import StopIcon from "../assets/stop_image.png";
import RecordIcon from "../assets/record_image.png";

type Props = {
  onRecord: () => void;
  onPause: () => Promise<void>;
  onStop: () => Promise<void>;
  onReset: () => void;
  disabled: { record: boolean; pause: boolean; stop: boolean }; // <-- NEW
};

export default function Sidebar({ onRecord, onPause, onStop, onReset, disabled }: Props) {
    const btnSize = "w-20 h-20 md:w-24 md:h-24";
    const baseBtn =
    "rounded-xl bg-slate-600 text-white grid place-items-center " +
    "disabled:opacity-40 disabled:cursor-not-allowed active:scale-95";
  
    return (
    <div className="h-full w-full flex flex-col items-center gap-4">
      <ControlButton
        round
        className={`bg-red-600 ${baseBtn} ${btnSize}`}
        disabled = {disabled.record}
        onClick={onRecord}
        aria-label="Record"
        title="Record"
      >
        <img src={RecordIcon} alt="Record" className="object-contain"/>
      </ControlButton>
      <ControlButton
        className={`${baseBtn} ${btnSize}`}
        disabled={disabled.pause}
        onClick={onPause}
        aria-label="Pause"
        title="Pause"
      >
        <img src={PauseIcon} alt="Pause" className="object-contain"/>
      </ControlButton>
      <ControlButton
        className={`${baseBtn} ${btnSize}`}
        disabled={disabled.stop}
        onClick={onStop}
        aria-label="Stop"
        title="Stop"
      >
        <img src={StopIcon} alt="Stop" className="h-4/5 object-contain"/>
      </ControlButton>
      <button
        onClick={onReset}
        className="mt-auto rounded-lg bg-slate-600 text-slate-100 active:scale-95
          w-[70%] max-w-[5.5rem] min-w-[3rem]
          py-[clamp(0.3rem,1.2vw,0.55rem)]
          text-[clamp(0.7rem,1.6vw,0.9rem)]
        "
      >
        RESET
      </button>
    </div>
  );
}
