import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Workflow } from "@/types/workflow";

const initWorkflow: Workflow = {
  id: 0,
  name: "",
  description: "",
  status: "draft",
  createdAt: "",
  updatedAt: "",
  runs: 0,
};

// mock fetch (replace later with API)
// const mockFetchWorkflow = (id: number): Workflow | null => {
//   const data = [
//     {
//       id: 1,
//       name: "User Onboarding Flow",
//       description: "Handles onboarding emails",
//       status: "active" as WorkflowStatus,
//       createdAt: "2026-01-10",
//       updatedAt: "2026-04-01",
//       runs: 120,
//     },
//   ];

//   return data.find((w) => w.id === id) ?? null;
// };

export default function WorkflowFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const isEditMode = Boolean(id && id !== "new");

  const [form, setForm] = useState<Workflow>(initWorkflow);

  const handleSubmit = () => {
    if (isEditMode) {
      console.log("UPDATE:", form);
    } else {
      console.log("CREATE:", {
        ...form,
        id: Date.now(),
        createdAt: new Date().toISOString().split("T")[0],
        updatedAt: new Date().toISOString().split("T")[0],
      });
    }

    navigate("/workflows");
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl border shadow-sm space-y-5">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">
          {isEditMode ? "Edit Workflow" : "Create Workflow"}
        </h1>
      </div>

      {/* NAME */}
      <div>
        <label className="text-sm text-gray-600">Name</label>
        <input
          type="text"
          placeholder="Enter workflow name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          className="w-full border px-3 py-2 rounded-md text-sm"
        />
      </div>

      {/* DESCRIPTION */}
      <div>
        <label className="text-sm text-gray-600">Description</label>
        <textarea
          placeholder="Enter workflow description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
          className="w-full border px-3 py-2 rounded-md text-sm"
        />
      </div>

      {/* STATUS */}
      <div>
        <label className="text-sm text-gray-600">Status</label>
        <select
          aria-label="Workflow status"
          value={form.status}
          onChange={(e) =>
            setForm({
              ...form,
              status: e.target.value as Workflow["status"],
            })
          }
          className="w-full border px-3 py-2 rounded-md text-sm"
        >
          <option value="draft">Draft</option>
          <option value="active">Active</option>
          <option value="paused">Paused</option>
        </select>
      </div>

      {/* ACTIONS */}
      <div className="flex justify-end gap-2 pt-4">

        <button
          onClick={() => navigate("/workflows")}
          className="px-4 py-2 border rounded-md text-sm"
        >
          Cancel
        </button>

        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-black text-white rounded-md text-sm"
        >
          {isEditMode ? "Update" : "Create"}
        </button>

      </div>

    </div>
  );
}