type Props = { value: string; onChange: (v: string) => void; };

export default function NotesPanel({ value, onChange }: Props) {
  return (
    <div className="h-full flex flex-col min-w-0">
      <h2 className="text-slate-700 font-semibold mb-3 truncate">Meeting Note Taker</h2>

      <div className="bg-white rounded-2xl shadow-inner p-3 flex-1 min-h-0">
        <textarea
          value={value}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)}
          className="
            w-full h-full resize-none outline-none font-mono
            text-[12px] sm:text-sm leading-5
          "
        />
      </div>
    </div>
  );
}
