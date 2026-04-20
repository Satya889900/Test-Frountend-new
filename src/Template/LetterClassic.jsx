export default function LetterClassic({ data, color }) {
  return (
    <div className="w-[794px] h-[1123px] bg-white shadow p-10 font-serif">
      <h1 className="text-2xl font-bold">{data.company}</h1>
      <p className="mt-2">{data.date}</p>

      <p className="mt-6">{data.receiver}</p>

      <h3 className="mt-6 font-semibold">{data.subject}</h3>

      <p className="mt-4 leading-relaxed">{data.body}</p>

      <p className="mt-10">Yours sincerely,</p>
      <p>{data.company}</p>
    </div>
  );
}