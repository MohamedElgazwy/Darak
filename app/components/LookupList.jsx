export default function LookupList({ title, items }) {
  return (
    <div className="surface-card p-6">
      <h2 className="mb-4 text-xl font-bold text-slate-950">{title}</h2>
      {items && items.length > 0 ? (
        <ul className="list-disc list-inside space-y-1">
          {items.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      ) : (
        <p className="text-s~late-600">لا توجد بيانات.</p>
      )}
    </div>
  );
}
