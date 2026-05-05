import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Workflow } from "@/types/workflow";

// const mockWorkflows: Workflow[] = [
//   {
//     id: 1,
//     name: "User Onboarding Flow",
//     description: "Handles onboarding emails",
//     status: "active",
//     createdAt: "2026-01-10",
//     updatedAt: "2026-04-01",
//     runs: 120,
//   },
// ];

export default function WorkflowDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [workflow, setWorkflow] = useState<Workflow | null>(null);

  
//   useEffect(() => {
//     const found = mockWorkflows.find((w) => w.id === Number(id));
//     setWorkflow(found ?? null);
//   }, [id]);

  if (!workflow) {
    return <div className="p-6">Workflow not found</div>;
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-start">

        <div>
          <h1 className="text-2xl font-semibold">{workflow.name}</h1>

          <p className="text-gray-500 text-sm mt-1">
            {workflow.description}
          </p>

          <span
            className={`inline-block mt-2 px-2 py-1 text-xs rounded ${
              workflow.status === "active"
                ? "bg-green-100 text-green-700"
                : workflow.status === "draft"
                ? "bg-gray-200 text-gray-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {workflow.status}
          </span>
        </div>

        <div className="flex gap-2">

          <button
            onClick={() => navigate(`/workflows/${workflow.id}/edit`)}
            className="px-3 py-2 border rounded-md text-sm"
          >
            Edit
          </button>

          <button
            onClick={() => navigate(`/workflows/${workflow.id}/builder`)}
            className="px-3 py-2 bg-black text-white rounded-md text-sm"
          >
            Open Builder
          </button>

        </div>

      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <div className="p-4 border rounded-lg">
          <p className="text-gray-500 text-sm">Total Runs</p>
          <p className="text-xl font-semibold">{workflow.runs}</p>
        </div>

        <div className="p-4 border rounded-lg">
          <p className="text-gray-500 text-sm">Success Rate</p>
          <p className="text-xl font-semibold text-green-600">92%</p>
        </div>

        <div className="p-4 border rounded-lg">
          <p className="text-gray-500 text-sm">Failed Runs</p>
          <p className="text-xl font-semibold text-red-600">8</p>
        </div>

      </div>

      {/* RECENT EXECUTIONS */}
      <div className="border rounded-lg bg-white">

        <div className="p-4 border-b font-medium">
          Recent Executions
        </div>

        <div className="divide-y">

          {[
            { status: "success", time: "2 mins ago", duration: "1.2s" },
            { status: "failed", time: "1 hour ago", duration: "0.8s" },
            { status: "success", time: "5 hours ago", duration: "1.0s" },
          ].map((run, i) => (
            <div key={i} className="p-4 flex justify-between text-sm">

              <div className="flex gap-2 items-center">

                <span
                  className={`px-2 py-1 text-xs rounded ${
                    run.status === "success"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {run.status}
                </span>

                <span className="text-gray-500">{run.time}</span>

              </div>

              <span className="text-gray-500">
                {run.duration}
              </span>

            </div>
          ))}

        </div>

      </div>

      {/* ACTION PANEL */}
      <div className="flex gap-3">

        <button
          onClick={() => navigate(`/workflows/${workflow.id}/builder`)}
          className="px-4 py-2 bg-black text-white rounded-md text-sm"
        >
          Open Builder
        </button>

        <button
          onClick={() => navigate(`/workflows/${workflow.id}/instances`)}
          className="px-4 py-2 border rounded-md text-sm"
        >
          View Instances
        </button>

        <button
          onClick={() => navigate(`/workflows/${workflow.id}/edit`)}
          className="px-4 py-2 border rounded-md text-sm"
        >
          Edit Workflow
        </button>

      </div>

    </div>
  );
}