function ActivityFeed() {
  const activities = [
    { event: "New user registered", time: "2 mins ago", status: "success" },
    { event: "Invoice #1023 paid", time: "10 mins ago", status: "success" },
    { event: "Workflow approved", time: "1 hour ago", status: "success" },
    { event: "System backup completed", time: "Yesterday", status: "info" },
  ];

  return (
    <div className="bg-white p-6 rounded-xl border shadow-sm mt-6">
      <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-gray-500 border-b">
            <tr>
              <th className="py-2">#</th>
              <th className="py-2">Event</th>
              <th className="py-2">Time</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>

          <tbody>
            {activities.map((item, index) => (
              <tr key={index} className="border-b last:border-0">
                
                {/* NUMBERING COLUMN */}
                <td className="py-3 text-gray-500">
                  {index + 1}
                </td>

                <td className="py-3">{item.event}</td>

                <td className="py-3 text-gray-500">
                  {item.time}
                </td>

                <td className="py-3">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      item.status === "success"
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ActivityFeed;