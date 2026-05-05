import { useState } from "react";
import { Search, Plus, Eye, Edit, Trash2 } from "lucide-react";
import type { Workflow } from "@/types/workflow";
import { useNavigate } from "react-router-dom";

const mockWorkflows: Workflow[] = [
  {
    id: 1,
    name: "User Onboarding Flow",
    description: "Handles new user onboarding emails",
    status: "active",
    createdAt: "2026-01-10",
    updatedAt: "2026-04-01",
    runs: 120,
  },
  {
    id: 2,
    name: "Payment Reminder",
    description: "Sends reminders for overdue invoices",
    status: "draft",
    createdAt: "2026-02-15",
    updatedAt: "2026-04-10",
    runs: 45,
  },
  {
    id: 3,
    name: "Support Escalation",
    description: "Escalates unresolved tickets",
    status: "paused",
    createdAt: "2026-03-05",
    updatedAt: "2026-04-18",
    runs: 78,
  },
];

export default function WorkflowsPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "draft" | "paused">("all");

  const filtered = mockWorkflows.filter((w) => {
    const matchesSearch = w.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || w.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedWorkflows = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="space-y-4">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">My Workflows</h1>

        <button className="bg-black text-white px-4 py-2 rounded-md text-sm flex items-center gap-2"
        onClick={() => navigate("/workflow/new")}>
          <Plus size={16} />
          Create Workflow
        </button>
      </div>

      {/* FILTERS */}
      <div className="flex gap-3">

        {/* SEARCH */}
        <div className="relative w-80">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
          <input
            className="w-full pl-9 pr-3 py-2 border rounded-md text-sm"
            placeholder="Search workflows..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* STATUS FILTER */}
        <select
          aria-label="Workflow status"
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value as typeof statusFilter)
          }
          className="border px-3 py-2 rounded-md text-sm"
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="draft">Draft</option>
          <option value="paused">Paused</option>
        </select>

      </div>

      {/* TABLE */}
      <div className="bg-white border rounded-xl shadow-sm overflow-x-auto">

        <table className="w-full text-sm text-left">
          <thead className="border-b text-gray-500">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Description</th>
              <th className="p-3">Status</th>
              <th className="p-3">Runs</th>
              <th className="p-3">Updated</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((w, index) => (
              <tr key={w.id} className="border-b hover:bg-gray-50">

                <td className="py-3 px-4">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>

                <td className="p-3 font-medium">{w.name}</td>
                <td className="p-3 text-gray-600">{w.description}</td>

                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      w.status === "active"
                        ? "bg-green-100 text-green-700"
                        : w.status === "draft"
                        ? "bg-gray-200 text-gray-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {w.status}
                  </span>
                </td>

                <td className="p-3">{w.runs}</td>
                <td className="p-3 text-gray-500">{w.updatedAt}</td>

                <td className="p-3">
                  <div className="flex justify-end gap-2">

                    <button title="View">
                      <Eye size={16} />
                    </button>

                    <button title="Edit">
                      <Edit size={16} />
                    </button>

                    <button title="Delete">
                      <Trash2 size={16} className="text-red-600" />
                    </button>

                  </div>
                </td>

              </tr>
            ))}
          </tbody>

        </table>

        {/* PAGINATION */}
        <div className="flex justify-between items-center p-4 text-sm">
          <p className="text-gray-500">
            Page {currentPage} of {totalPages} - Showing {paginatedWorkflows.length} of {totalItems} workflows
          </p>

          <div className="flex gap-1">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                      className="px-3 py-1 border rounded text-sm disabled:opacity-50"
                      disabled={currentPage === 1}
                    >
                      Prev
                    </button>

                    {/* PAGE NUMBERS */}
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-1 border rounded text-sm transition
                          ${
                            currentPage === page
                              ? "bg-black text-white"
                              : "hover:bg-gray-100"
                          }`}
                      >
                        {page}
                      </button>
                    ))}

                    <button
                      onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                      className="px-3 py-1 border rounded text-sm disabled:opacity-50"
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </button>
                  </div>
        </div>

      </div>

    </div>
  );
}