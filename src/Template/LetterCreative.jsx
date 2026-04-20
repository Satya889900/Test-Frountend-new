export default function LetterCreative({ data, color }) {
  const colorMap = {
    blue: "bg-blue-500",
    red: "bg-red-500",
    yellow: "bg-yellow-400",
    green: "bg-green-500"
  };

  return (
    <div className="w-[794px] h-[1123px] bg-white shadow relative overflow-hidden">

      {/* Top bar */}
      <div className={`h-20 w-full ${colorMap[color]}`} />

      {/* Diagonal shape */}
      <div className={`absolute top-0 right-0 w-40 h-40 ${colorMap[color]} rotate-45 translate-x-20 -translate-y-20`} />

      {/* Content */}
      <div className="p-10">
        <h1 className="text-xl font-bold">{data.company}</h1>
        <p>{data.date}</p>

        <h3 className="mt-6 font-semibold">{data.subject}</h3>
        <p className="mt-4">{data.body}</p>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 w-full bg-gray-900 text-white p-4 text-center">
        Modern Creative Footer
      </div>

    </div>
  );
}