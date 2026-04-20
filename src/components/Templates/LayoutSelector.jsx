export default function LayoutSelector({ selected, setSelected }) {
  const layouts = ["classic", "modern", "creative"];

  return (
    <div className="flex gap-4">
      {layouts.map((l) => (
        <button
          key={l}
          onClick={() => setSelected(l)}
          className={`px-4 py-2 rounded ${
            selected === l
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}