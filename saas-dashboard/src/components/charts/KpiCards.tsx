const kpis = [
  { label: "Revenue", value: "$24,500", change: "+12%" },
  { label: "Users", value: "1,240", change: "+8%" },
  { label: "Sessions", value: "3,560", change: "+5%" },
  { label: "Growth", value: "18%", change: "+2%" },
];

export default function KpiCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {kpis.map((kpi) => (
        <div
          key={kpi.label}
          className="bg-white p-4 rounded-xl border shadow-sm"
        >
          <p className="text-sm text-gray-500">{kpi.label}</p>
          <h2 className="text-xl font-bold mt-1">{kpi.value}</h2>
          <p className="text-green-600 text-sm mt-1">{kpi.change}</p>
        </div>
      ))}
    </div>
  );
}