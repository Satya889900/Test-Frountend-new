export default function LetterModern({ data, color }) {

  const colorMap = {
    blue: "bg-blue-500",
    red: "bg-red-500",
    yellow: "bg-yellow-500"
  };

  return (
    <div className="w-[794px] h-[1123px] bg-white shadow relative">

      {/* Sidebar */}
      <div className={`absolute left-0 top-0 w-16 h-full ${colorMap[color]}`} />

      {/* Content */}
      <div className="ml-20 p-6">
        <h1 className="text-xl font-bold">{data.company}</h1>
        <p>{data.date}</p>
        <h3 className="mt-4">{data.subject}</h3>
        <p className="mt-4">{data.body}</p>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 w-full bg-gray-800 text-white p-3 text-center">
        Contact Info
      </div>

    </div>
  );
}