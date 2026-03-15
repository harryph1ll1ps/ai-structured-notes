import { MODES, Mode, Status } from "../shared/types";

// properties that will get passed to NoteControls component
type NoteControlsProps = {
  currentMode: Mode;
  onModeChange: (mode: Mode) => void;
  onGenerate: () => void;
  status: Status;
  canGenerate: boolean;
};


// component for the controls section (mode/generate)
export default function NoteControls({
  currentMode,
  onModeChange,
  onGenerate,
  status,
  canGenerate,
}: NoteControlsProps) {
  return (
    <div className="mt-4">
      <label className="text-sm text-neutral-900">Format</label>

      <select
        value={currentMode}
        onChange={(e) => onModeChange(e.target.value as Mode)}
        disabled={status === "loading"}
        className="
          mt-1 w-full
          rounded-md
          border border-neutral-300
          bg-white
          px-3 py-2
          text-sm
          outline-none
          focus:border-neutral-400
        "
      >
        {MODES.map((mode) => (
          <option key={mode} value={mode}>
            {mode}
          </option>
        ))}
      </select>

      <button
        onClick={onGenerate}
        disabled={status === "loading" || !canGenerate}
        className="
          mt-3 w-full
          rounded-md
          bg-neutral-900
          px-4 py-3
          text-sm font-medium text-white
          hover:bg-neutral-800
          disabled:bg-neutral-400
        "
      >
        {status === "loading" ? "Generating..." : "Generate"}
      </button>
    </div>
  );
}