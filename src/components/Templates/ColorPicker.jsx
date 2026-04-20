export default function ColorPicker({ selected, setSelected }) {
  const colors = ["blue", "red", "yellow", "green"];

  return (
    <div className="flex gap-3">
      {colors.map((c) => (
        <div
          key={c}
          onClick={() => setSelected(c)}
          className={`w-8 h-8 rounded-full cursor-pointer bg-${c}-500 ${
            selected === c ? "ring-2 ring-black" : ""
          }`}
        />
      ))}
    </div>
  );
}