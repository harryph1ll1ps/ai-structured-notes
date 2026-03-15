// properties that will get passed to NoteEditor component
type NoteEditorProps = {
    value: string;
    onEdit: (value: string) => void;
    disabled?: boolean;
    placeholder?: string;
};

// component for the note input/output
export default function NoteEditor({
    value, 
    onEdit, 
    disabled = false, 
    placeholder = "Type or paste notes here...",
}: NoteEditorProps) {
  return (
    <textarea
      value={value}
      onChange={(e) => onEdit(e.target.value)}
      disabled={disabled}
      placeholder={placeholder}
      className="
        w-full h-[60vh]
        resize-none
        bg-white
        px-12 py-12
        text-[15px] leading-7 text-black
        shadow-lg
        outline-none
        disabled:text-neutral-500
      "
    />
  );
}